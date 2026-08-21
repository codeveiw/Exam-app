import { api } from "@/services/api/axios";
import type {
  SubmitExamPayload,
  SubmitExamResponse,
} from "../types/diploma";

export async function submitExam(
  payload: SubmitExamPayload
): Promise<SubmitExamResponse> {
  const response = await api.post<SubmitExamResponse>(
    "/submissions",
    payload
  );

  return response.data;
}