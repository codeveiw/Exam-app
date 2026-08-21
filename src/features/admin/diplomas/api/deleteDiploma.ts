import { api } from "@/services/api/axios";

interface DeleteDiplomaResponse {
  message?: string;
  status?: boolean;
  code?: number;
  [key: string]: unknown;
}

export async function deleteDiploma(
  id: string
): Promise<DeleteDiplomaResponse> {
  const response = await api.delete<DeleteDiplomaResponse>(
    `/diplomas/${id}`
  );

  return response.data;
}