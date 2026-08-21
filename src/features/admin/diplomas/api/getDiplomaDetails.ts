import { api } from "@/services/api/axios";
import type { GetDiplomaDetailsResponse } from "../types/diploma";

export async function getDiplomaDetails(id: string) {
  const response = await api.get<GetDiplomaDetailsResponse>(
    `/diplomas/${id}`
  );

  return response.data;
}