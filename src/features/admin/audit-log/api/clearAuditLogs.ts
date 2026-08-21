import { api } from "@/services/api/axios";

export interface ClearAuditLogsResponse {
    status: boolean;
    code: number;
    payload: {
        deletedCount: number;
    };
}

export async function clearAuditLogs(): Promise<ClearAuditLogsResponse> {
    const response = await api.delete<ClearAuditLogsResponse>("/admin/audit-logs");
    return response.data;
}
