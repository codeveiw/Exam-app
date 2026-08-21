import { z } from "zod";

export const examSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required"),

  description: z
    .string()
    .min(1, "Description is required"),

  image: z
    .union([z.string(), z.instanceof(File)])
    .optional(),

  duration: z.coerce
    .number()
    .min(1, "Duration must be at least 1 minute"),

  diplomaId: z
    .string()
    .min(1, "Diploma is required"),
});

export type ExamFormValues = z.infer<typeof examSchema>;