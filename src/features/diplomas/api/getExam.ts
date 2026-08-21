
import { api } from "@/services/api/axios";
import type { GetExamsResponse } from "../types/diploma";

export async function getExams(
  diplomaId: string,
  page: number = 1
) {
  const response = await api.get<GetExamsResponse>("/exams", {
    params: {
      diplomaId,
      page,
      limit: 12,
    },
  });

  return response.data;
}