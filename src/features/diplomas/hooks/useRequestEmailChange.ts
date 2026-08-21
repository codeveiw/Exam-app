import { useMutation } from "@tanstack/react-query";
import { requestEmailChange } from "../api/requestEmailChange";

export default function useRequestEmailChange() {
  return useMutation({
    mutationFn: requestEmailChange,
  });
}