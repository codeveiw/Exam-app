import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateQuestion } from "../api/updateQuestion";
import type { QuestionFormValues } from "../types/question";

export default function useUpdateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: QuestionFormValues;
    }) => updateQuestion(id, values),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["questions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["question", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["exams"],
      });
    },
  });
}