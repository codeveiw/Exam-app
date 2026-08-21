import { api } from "@/services/api/axios";
import type { ChangePasswordPayload, ChangePasswordResponse } from "../types/account";


export async function changePassword(
  payload: ChangePasswordPayload
) {
  const response = await api.post<ChangePasswordResponse>(
    "/users/change-password",
    payload
  );

  return response.data;
}