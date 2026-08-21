import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createBulkQuestions } from "../api/createBulkQuestions";
import type { BulkQuestionsFormValues } from "../types/question";

export default function useCreateBulkQuestions() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            examId,
            values,
        }: {
            examId: string;
            values: BulkQuestionsFormValues;
        }) => createBulkQuestions(examId, values),

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
