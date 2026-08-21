import { api } from "@/services/api/axios";

export interface DeleteAuditLogResponse {
    status: boolean;
    code: number;
    message: string;
}

export async function deleteAuditLog(id: string): Promise<DeleteAuditLogResponse> {
    const response = await api.delete<DeleteAuditLogResponse>(`/admin/audit-logs/${id}`);
    return response.data;
}
