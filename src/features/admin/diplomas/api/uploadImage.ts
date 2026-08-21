import axios from "axios";
import { api } from "@/services/api/axios";

interface UploadImageResponse {
  payload?: {
    url: string;
  };
  url?: string;
}

export async function uploadImage(
  image: File
): Promise<UploadImageResponse> {
  const formData = new FormData();

  formData.append("image", image, image.name);

  try {
    const response = await api.post<UploadImageResponse>(
      "/upload",
      formData
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "UPLOAD ERROR:",
        error.response?.data
      );
    }

    throw error;
  }
}