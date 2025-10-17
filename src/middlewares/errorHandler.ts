import type { Request, Response, NextFunction } from "express";
import { success, ZodError } from "zod";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Error caught by middleware:", err.message);

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      error: err.issues.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    message,
    error: err.errors || null,
  });
  next();
}

export function throwError(
  message: string,
  status: number,
  details?: any
): never {
  const err = new Error(message);
  (err as any).status = status;
  (err as any).errors = details;
  throw err;
}
