import { api } from "@/services/api/axios";
import type { UpdateExamData, UpdateExamResponse } from "../types/exam";

export async function updateExam(
  id: string,
  values: UpdateExamData
): Promise<UpdateExamResponse> {
  const response = await api.put<UpdateExamResponse>(
    `/exams/${id}`,
    values
  );

  return response.data;
}