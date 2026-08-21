
import { api } from "@/services/api/axios";
import type {
  ChangeEmailPayload,
  ChangeEmailResponse,
} from "../types/account";

export async function requestEmailChange(
  payload: ChangeEmailPayload
): Promise<ChangeEmailResponse> {
  const { data } = await api.post<ChangeEmailResponse>(
    "/users/email/request",
    payload
  );

  return data;
}