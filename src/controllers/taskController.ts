import type { NextFunction, Request, Response } from "express";
import { throwError } from "../middlewares/errorHandler.js";
import { TaskService } from "../services/taskService.js";

const service = new TaskService();

export async function getTasks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const tasks = await service.listTasks();
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    next(err);
  }
}

export async function getTaskById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const task = await service.getTask(id);
    if (!task) throwError("Task not found", 404);
    res.status(200).json({ success: true, data: task });
  } catch (err: any) {
    next(err);
  }
}

export async function addTask(req: Request, res: Response, next: NextFunction) {
  try {
    const task = await service.createTask(req.body.title);

    res.status(201).json({ success: true, data: task });
  } catch (err: any) {
    next(err);
  }
}

export async function updateTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const updates = req.body;
    if (!Object.keys(updates).length) throwError("No updates provided", 400);

    const task = service.updateTask(id, updates);
    if (!task) throwError("Task not found", 404);

    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
}

export async function deleteTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    await service.deleteTask(id);
    res.status(200).json({
      success: true,
      message: `Task ${id} deleted successfully`,
    });
  } catch (err) {
    next();
  }
}
