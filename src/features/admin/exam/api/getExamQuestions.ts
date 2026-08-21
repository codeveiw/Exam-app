import { api } from "@/services/api/axios";
import type { ExamQuestionsResponse, GetExamQuestionsParams } from "../types/questions";

export async function getExamQuestions(
  examId: string,
  params?: GetExamQuestionsParams
): Promise<ExamQuestionsResponse> {
  const response = await api.get<ExamQuestionsResponse>(
    `/questions/exam/${examId}`,
    {
      params,
    }
  );

  return response.data;
}