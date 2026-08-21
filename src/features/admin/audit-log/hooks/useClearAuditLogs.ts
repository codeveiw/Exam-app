import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearAuditLogs } from "../api/clearAuditLogs";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function useClearAuditLogs() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: clearAuditLogs,
        onSuccess: () => {
            toast.success("All audit logs have been successfully cleared.");
            queryClient.invalidateQueries({ queryKey: ["admin-audit-logs"] });
        },
        onError: (error: AxiosError<{ message: string }>) => {
            const message = error.response?.data?.message || "Failed to clear audit logs.";
            toast.error(message);
        },
    });
}
