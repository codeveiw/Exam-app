import { api } from "@/services/api/axios";
import type { GetProfileResponse } from "../types/account";

export async function getProfile() {
  try {
    const response = await api.get<GetProfileResponse>("/users/profile");

    console.log("GET PROFILE RESPONSE:", response.data);

    return response.data;
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    throw error;
  }
}