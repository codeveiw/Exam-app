import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createQuestion } from "../api/createQuestion";
import type { QuestionFormValues } from "../types/question";

export default function useCreateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      examId,
      values,
    }: {
      examId: string;
      values: QuestionFormValues;
    }) => createQuestion(examId, values),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["questions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["exams"],
      });
    },
  });
}