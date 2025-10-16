import { Router } from "express";
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
  getTaskById,
  clearAllTasks,
} from "../controllers/taskController.js";
import { validate } from "../middlewares/validate.js";
import { TaskSchema } from "../models/taskSchema.js";

const taskRouter: Router = Router();

taskRouter.get("/", getTasks);
taskRouter.get("/:id", getTaskById);
taskRouter.post("/", validate(TaskSchema), addTask);
taskRouter.put("/:id", validate(TaskSchema.partial()), updateTask);
taskRouter.delete("/:id", deleteTask);
taskRouter.delete("/", clearAllTasks);

export default taskRouter;
