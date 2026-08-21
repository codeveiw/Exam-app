
import { api } from "@/services/api/axios";
import type {
  ConfirmEmailPayload,
  ConfirmEmailResponse,
} from "../types/account";

export async function confirmEmail(
  payload: ConfirmEmailPayload
): Promise<ConfirmEmailResponse> {
  const { data } = await api.post<ConfirmEmailResponse>(
    "/users/email/confirm",
    payload
  );

  return data;
}