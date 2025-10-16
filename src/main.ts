import express from "express";
import taskRouter from "./routes/taskRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./middlewares/logger.js";

const app = express();
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("Welcome to Task Management API");
});

app.use("/tasks", taskRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
