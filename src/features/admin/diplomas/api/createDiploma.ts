import { api } from "@/services/api/axios";
import type { CreateDiplomaPayload, CreateDiplomaResponse } from "../types/diploma";

export async function createDiploma(
  values: CreateDiplomaPayload
): Promise<CreateDiplomaResponse> {
  const response = await api.post<CreateDiplomaResponse>(
    "/diplomas",
    values
  );

  return response.data;
}