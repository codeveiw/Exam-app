
import { api } from "@/services/api/axios";
import type {
  DiplomaFormValues,
  DiplomaResponse,
} from "../types/diploma";

export async function updateDiploma(
  id: string,
  data: DiplomaFormValues
): Promise<DiplomaResponse> {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("image", data.image as any);

  const response = await api.put<DiplomaResponse>(`/diplomas/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}