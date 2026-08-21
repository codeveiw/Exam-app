import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../api/changePasswordApi";

export default function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}