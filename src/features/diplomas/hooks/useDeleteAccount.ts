// hooks/useDeleteAccount.ts

import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../api/deleteAccount";

export default function useDeleteAccount() {
  return useMutation({
    mutationFn: deleteAccount,

    onSuccess: (data) => {
      console.log("ACCOUNT DELETED:", data);
    },

    onError: (error) => {
      console.log("DELETE ACCOUNT ERROR:", error);
    },
  });
}