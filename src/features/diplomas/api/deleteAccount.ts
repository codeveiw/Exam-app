// services/deleteAccount.ts

import { api } from "@/services/api/axios";
import type { DeleteAccountResponse } from "../types/account";

export async function deleteAccount(): Promise<DeleteAccountResponse> {
  const response = await api.delete<DeleteAccountResponse>(
    "/users/account"
  );

  return response.data;
}