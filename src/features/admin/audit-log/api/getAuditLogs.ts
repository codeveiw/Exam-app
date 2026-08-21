import { api } from "@/services/api/axios";
import type { AuditLogResponse, GetAuditLogsParams } from "../types/auditLog";

export async function getAuditLogs(
    params?: GetAuditLogsParams
): Promise<AuditLogResponse> {
    const response = await api.get<AuditLogResponse>(
        "/admin/audit-logs",
        { params }
    );
    return response.data;
}
