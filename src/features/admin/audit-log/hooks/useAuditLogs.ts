import { useQuery } from "@tanstack/react-query";
import { getAuditLogs } from "../api/getAuditLogs";
import type { GetAuditLogsParams } from "../types/auditLog";

export default function useAuditLogs(params?: GetAuditLogsParams) {
    return useQuery({
        queryKey: ["admin-audit-logs", params],
        queryFn: () => getAuditLogs(params),
    });
}
