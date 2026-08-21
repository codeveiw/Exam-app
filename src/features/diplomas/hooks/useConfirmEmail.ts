import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmEmail } from "../api/confirmEmail";

export default function useConfirmEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: confirmEmail,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
}