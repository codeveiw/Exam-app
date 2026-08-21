export interface AuditLogEntry {
    id: string;
    createdAt: string;
    actorUserId: string;
    actorUsername: string;
    actorEmail: string;
    actorRole: string;
    category: "DIPLOMA" | "EXAM" | "QUESTION" | "USER" | "SYSTEM" | string;
    action: "CREATE" | "UPDATE" | "DELETE" | "SET_IMMUTABLE" | "SEED_DATA" | string;
    entityType: string;
    entityId: string;
    metadata: Record<string, any>;
    ipAddress: string;
    userAgent: string;
    httpMethod: string;
    path: string;
}

export interface AuditLogResponse {
    status: boolean;
    code: number;
    payload: {
        data: AuditLogEntry[];
        metadata: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    };
}

export interface GetAuditLogsParams {
    page?: number;
    limit?: number;
    category?: string;
    action?: string;
    actorUserId?: string;
    sortBy?: "action" | "user" | "entity" | "createdAt" | string;
    sortOrder?: "asc" | "desc";
    search?: string;
}
