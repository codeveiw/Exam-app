import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuestion } from "../api/deleteQuestion";

export default function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteQuestion(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["questions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["question", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["exams"],
      });
    },
  });
}