import { api } from "@/services/api/axios";
import type { GetQuestionsResponse } from "../types/diploma";

export async function getQuestions(examId: string) {
  const response = await api.get<GetQuestionsResponse>(
    `/questions/exam/${examId}`
  );

  return response.data;
}