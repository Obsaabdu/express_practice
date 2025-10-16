import { taskMetadata, TaskSchema, type Task } from "../models/taskSchema.js";
import { FileDb } from "../storage/fileDb.js";

export class TaskService {
  private db: FileDb<Task>;

  constructor() {
    this.db = new FileDb<Task>("./data/tasks.json", taskMetadata, TaskSchema);
  }

  async listTasks(): Promise<Task[]> {
    return this.db.getAll();
  }

  async getTask(id: number): Promise<Task | null> {
    return this.db.getById(id);
  }

  async createTask(data: Omit<Task, "id">): Promise<Task> {
    return this.db.create({
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: null,
    });
  }

  async updateTask(id: number, updates: Partial<Task>): Promise<Task | null> {
    updates.updatedAt = new Date().toISOString();
    return this.db.update(id, updates);
  }

  async deleteTask(id: number): Promise<boolean> {
    return this.db.delete(id);
  }

  async clearAll(): Promise<void> {
    await this.db.clear();
  }
}
