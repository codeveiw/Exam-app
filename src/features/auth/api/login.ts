import { api } from "@/services/api/axios";
import type { LoginFormData } from "../forms/schemas/login.schema";
import type { LoginApiResponse, LoginResponse } from "../types/user";

export type LoginRequest = LoginFormData;




export async function login(
  data: LoginRequest
): Promise<LoginResponse> {
  const response = await api.post<LoginApiResponse>(
    "/auth/login",
    data
  );

  return response.data.payload;
}