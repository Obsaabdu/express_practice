import { prisma } from "../db.js";

export class TaskService {
  constructor() {}

  async listTasks() {
    return prisma.task.findMany({ orderBy: { id: "asc" } });
  }

  async getTask(id: number) {
    return prisma.task.findUnique({ where: { id } });
  }

  async createTask(title: string) {
    return prisma.task.create({
      data: { title },
    });
  }

  async updateTask(id: number, updates: { title?: string }) {
    return prisma.task.update({
      where: { id },
      data: { ...updates, updatedAt: new Date() },
    });
  }

  async deleteTask(id: number) {
    await prisma.task.delete({ where: { id } });
    return true;
  }
}
