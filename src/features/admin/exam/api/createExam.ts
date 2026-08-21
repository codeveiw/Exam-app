import { api } from "@/services/api/axios";
import type { CreateExamResponse } from "../types/exam";
import type { ExamFormValues } from "../forms/schema/examSchema";

export async function createExam(
  values: Omit<ExamFormValues, "image"> & {
    image: string;
  }
): Promise<CreateExamResponse> {
  const response = await api.post("/exams", values);

  return response.data;
}