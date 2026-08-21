import { api } from "@/services/api/axios";
import type {
  QuestionFormValues,
  QuestionResponse,
} from "../types/question";

export async function updateQuestion(
  id: string,
  values: QuestionFormValues
): Promise<QuestionResponse> {
  const response = await api.put<QuestionResponse>(
    `/questions/${id}`,
    {
      text: values.text,
      answers: values.answers,
    }
  );

  return response.data;
}