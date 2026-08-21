import { api } from "@/services/api/axios";
import type {
  UpdateProfilePayload,
  UpdateProfileResponse,
} from "../types/account";

export async function updateProfile(
  data: UpdateProfilePayload
): Promise<UpdateProfileResponse> {
  const response = await api.patch<UpdateProfileResponse>(
    "/users/profile",
    data
  );

  return response.data;
}