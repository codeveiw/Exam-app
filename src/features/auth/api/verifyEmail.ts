import { api } from "@/services/api/axios";
import type { VerifyEmailRequest } from "../types/user";

export async function verifyEmail(
  data: VerifyEmailRequest
) {
  console.log("DATA SENT:", data);

  const response = await api.post(
    "/auth/confirm-email-verification",
    data
  );

  console.log("RESPONSE:", response.data);

  return response.data;
}