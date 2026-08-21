import { api } from "@/services/api/axios";
import type {
  QuestionFormValues,
  QuestionResponse,
} from "../types/question";

export async function createQuestion(
  examId: string,
  values: QuestionFormValues
): Promise<QuestionResponse> {
  const response = await api.post<QuestionResponse>(
    `/questions/exam/${examId}`,
    {
      text: values.text,
      answers: values.answers,
    }
  );

  return response.data;
}