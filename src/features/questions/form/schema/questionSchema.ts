import { z } from "zod";

export const questionSchema = z.object({
  examId: z.string().min(1, "Please select an exam"),

  text: z
    .string()
    .trim()
    .min(1, "Question headline is required"),

  answers: z
    .array(
      z.object({
        text: z
          .string()
          .trim()
          .min(1, "Answer is required"),

        isCorrect: z.boolean(),
      })
    )
    .min(2, "At least 2 answers are required")
    .refine(
      (answers) =>
        answers.filter((answer) => answer.isCorrect).length === 1,
      {
        message: "Exactly one answer must be correct",
      }
    ),
});

export type QuestionFormSchema = z.infer<typeof questionSchema>;