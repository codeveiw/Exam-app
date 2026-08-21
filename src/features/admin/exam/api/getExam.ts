import { api } from "@/services/api/axios";
import type { ExamsResponse } from "../types/exam";

export interface GetExamsParams {
  page?: number;
  limit?: number;
  diplomaId?: string;
  immutable?: boolean;
  sortBy?: "title" | "createdAt" | "questions";
  sortOrder?: "asc" | "desc";
  search?: string;
}

export async function getExams(
  params?: GetExamsParams
): Promise<ExamsResponse> {
  const response = await api.get<ExamsResponse>(
    "/exams",
    {
      params,
    }
  );

  return response.data;
}