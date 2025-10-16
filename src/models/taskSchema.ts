import { z } from "zod";
import type { Metadata } from "./metadataManager.js";

export const taskMetadata: Metadata = {
  id: 0,
  title: 1,
  completed: 2,
  createdAt: 3,
  updatedAt: 4,
} as const;

export const TaskSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title is required and must be non-empty."),
  completed: z.boolean().default(false),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
});

export type Task = z.infer<typeof TaskSchema>;
