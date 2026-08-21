import { z } from "zod";

export const diplomaSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required"),

  description: z
    .string()
    .min(1, "Description is required"),

  image: z
    .any()
    .refine((val) => !!val, "Image is required"),
});

export type DiplomaFormValues = z.infer<
  typeof diplomaSchema
>;