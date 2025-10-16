import fs from "fs/promises";
import { z } from "zod";
import type { DatabaseSchema, Metadata } from "../models/metadataManager.js";

export class FileDb<T extends Record<string, any>> {
  constructor(
    private filePath: string,
    private metadata: Metadata,
    private schema: z.ZodSchema<T>
  ) {}

  private async read(): Promise<DatabaseSchema> {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(data) as DatabaseSchema;
    } catch (err: any) {
      if (err.code === "ENOENT") {
        const initialData: DatabaseSchema = {
          idNum: 0,
          metadata: this.metadata,
          data: {},
        };
        await this.write(initialData);
        return initialData;
      } else {
        throw err;
      }
    }
  }

  private async write(db: DatabaseSchema): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(db, null, 2), "utf-8");
  }

  async create(data: Omit<T, "id">): Promise<T> {
    const db = await this.read();
    const id = db.idNum + 1;
    db.idNum = id;

    const parsed = this.schema.parse({ ...data, id });

    const entry: Record<number, any> = {};
    for (const [key, index] of Object.entries(this.metadata)) {
      entry[index] = (parsed as any)[key];
    }

    db.data[id] = entry;
    await this.write(db);
    return parsed;
  }

  async update(id: number, updates: Partial<T>): Promise<T | null> {
    const db = await this.read();
    const entry = db.data[id];
    if (!entry) return null;

    const existing = this.convertToObject(entry, db.metadata);
    const updated = { ...existing, ...updates };

    const parsed = this.schema.parse(updated);

    for (const [key, index] of Object.entries(db.metadata)) {
      entry[index] = (parsed as any)[key];
    }

    db.data[id] = entry;
    await this.write(db);
    return parsed;
  }

  async delete(id: number): Promise<boolean> {
    const db = await this.read();
    if (!db.data[id]) return false;

    delete db.data[id];
    await this.write(db);
    return true;
  }

  async clear(): Promise<void> {
    const initialData: DatabaseSchema = {
      idNum: 0,
      metadata: this.metadata,
      data: {},
    };
    await this.write(initialData);
  }

  async getAll(): Promise<T[]> {
    const db = await this.read();
    return Object.values(db.data).map((entry) =>
      this.convertToObject(entry, db.metadata)
    ) as T[];
  }

  async getById(id: number): Promise<T | null> {
    const db = await this.read();
    const entry = db.data[id];
    if (!entry) return null;
    return this.convertToObject(entry, db.metadata);
  }

  private convertToObject(entry: Record<number, any>, metadata: Metadata): T {
    const obj: Record<string, any> = {};
    for (const [key, index] of Object.entries(metadata)) {
      obj[key] = entry[index];
    }
    return obj as T;
  }
}
