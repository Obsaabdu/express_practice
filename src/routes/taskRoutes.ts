import { Router } from "express";
import * as controller from "../controllers/taskController.js";
import { validate } from "../middlewares/validator.js";
import { createTaskSchema, updateTaskSchema } from "../schemas/taskSchemas.js";

export const taskRouter: Router = Router();

taskRouter.get("/", controller.getTasks);
taskRouter.get("/:id", controller.getTaskById);
taskRouter.post("/", validate(createTaskSchema), controller.addTask);
taskRouter.put("/:id", validate(updateTaskSchema), controller.updateTask);
taskRouter.delete("/:id", controller.deleteTask);
