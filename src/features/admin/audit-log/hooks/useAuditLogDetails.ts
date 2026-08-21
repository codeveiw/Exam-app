import { useQuery } from "@tanstack/react-query";
import { getAuditLogDetails } from "../api/getAuditLogDetails";

export default function useAuditLogDetails(id: string) {
    return useQuery({
        queryKey: ["admin-audit-log-details", id],
        queryFn: () => getAuditLogDetails(id),
        enabled: !!id,
    });
}
