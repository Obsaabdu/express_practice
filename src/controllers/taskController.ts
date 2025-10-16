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
    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully.",
      data: await service.listTasks(),
    });
  } catch (err: any) {
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

    return res.status(200).json({
      success: true,
      message: `Task ${id} fetched successfully.`,
      data: task,
    });
  } catch (err: any) {
    next(err);
  }
}

export async function addTask(req: Request, res: Response, next: NextFunction) {
  try {
    const task = await service.createTask(req.body);

    res.status(201).json({
      status: true,
      message: "Task added successfully",
      data: task,
    });
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

    res.status(200).json({
      success: true,
      message: `Task updated successfully.`,
      data: task,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteTask(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!service.deleteTask(id)) throwError("Task not found", 404);
  res.status(200).json({
    success: true,
    message: `Task ${id} deleted successfully`,
  });
}

export async function clearAllTasks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await service.clearAll();
  } catch (err) {
    next(err);
  }
}
