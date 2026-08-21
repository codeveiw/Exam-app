import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExam } from "../api/deleteExam";
import { toast } from "sonner";

export default function useDeleteExam() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteExam(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-exams"] });
        },
        onError: (error) => {
            console.error("Delete Exam Error:", error);
            toast.error("Failed to delete the exam.");
        },
    });
}
