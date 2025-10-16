import type { Request, Response, NextFunction } from "express";
import type { z } from "zod";
import { throwError } from "./errorHandler.js";

export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      }));
      return throwError("Validation error", 400, errors);
    }

    req.body = result.data;
    next();
  };
}
