import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAuditLog } from "../api/deleteAuditLog";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function useDeleteAuditLog() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteAuditLog(id),
        onSuccess: () => {
            toast.success("Audit log entry deleted successfully.");
            queryClient.invalidateQueries({ queryKey: ["admin-audit-logs"] });
        },
        onError: (error: AxiosError<{ message: string }>) => {
            const message = error.response?.data?.message || "Failed to delete audit log entry.";
            toast.error(message);
        },
    });
}
