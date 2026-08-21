import { api } from "@/services/api/axios"






import type { GetExamResponse } from "../types/diploma";

export async function getExamId(id: string) {
  const response = await api.get<GetExamResponse>(
    `/exams/${id}`
  );

  console.log("API RESPONSE:", response.data);

  return response.data;
}