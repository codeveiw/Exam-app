import { api } from "@/services/api/axios";
import type { ExamDetailsResponse } from "../types/exam";

export async function getExamDetails(
  id: string
): Promise<ExamDetailsResponse> {
  const response = await api.get<ExamDetailsResponse>(`/exams/${id}`);

  return response.data;
}