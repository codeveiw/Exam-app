import { api } from "@/services/api/axios";

export async function deleteQuestion(id: string) {
  const response = await api.delete(`/questions/${id}`);

  return response.data;
}