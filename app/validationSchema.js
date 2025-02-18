
import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }).max(255),
  description: z.string().min(1, { message: "Description is required." }),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required." })
    .max(255)
    .optional(),
  description: z
    .string()
    .min(1, { message: "Description is required." })
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, { message: "AssignedTouserId is required" })
    .max(255)
    .optional()
    .nullable(),
});
