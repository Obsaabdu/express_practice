import chalk from "chalk";
import type { Request, Response, NextFunction } from "express";

export async function logger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const color =
      res.statusCode < 300
        ? chalk.green
        : res.statusCode < 400
        ? chalk.yellow
        : chalk.red;

    const log = color(
      `[${new Date().toLocaleTimeString()}] ${req.method} ${
        req.originalUrl
      } → ${res.statusCode} (${duration}ms)`
    );

    console.log(log);
  });

  next();
}
