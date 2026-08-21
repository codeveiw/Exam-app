import { api } from "@/services/api/axios";
import type { AuditLogEntry } from "../types/auditLog";

export interface AuditLogDetailsResponse {
    status: boolean;
    code: number;
    payload: {
        auditLog: AuditLogEntry;
    };
}

export async function getAuditLogDetails(id: string): Promise<AuditLogDetailsResponse> {
    const response = await api.get<AuditLogDetailsResponse>(`/admin/audit-logs/${id}`);
    return response.data;
}
