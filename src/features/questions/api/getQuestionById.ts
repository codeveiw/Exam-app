import { api } from "@/services/api/axios";
import type { QuestionDetailsResponse } from "../types/question";

export async function getQuestionById(
  id: string
): Promise<QuestionDetailsResponse> {
  const response = await api.get(
    `/questions/${id}`
  );

  console.log("QUESTION DETAILS RESPONSE:", response.data);

  return response.data;
}