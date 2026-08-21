import { useState } from "react";
import { AuditLogFilters } from "../components/AuditLogFilters";
import { AuditLogTable } from "../components/AuditLogTable";
import { AuditLogPagination } from "../components/AuditLogPagination";
import useAuditLogs from "../hooks/useAuditLogs";
import useClearAuditLogs from "../hooks/useClearAuditLogs";
import useDeleteAuditLog from "../hooks/useDeleteAuditLog";
import type { GetAuditLogsParams } from "../types/auditLog";
import { ClearLogsModal } from "../components/ClearLogsModal";
import { toast } from "sonner";

export function AdminAuditLogPage() {
    const [filters, setFilters] = useState<GetAuditLogsParams>({
        page: 1,
        limit: 20,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

    const { data, isLoading } = useAuditLogs(filters);
    const { mutate: clearLogs, isPending: isClearing } = useClearAuditLogs();
    const { mutate: deleteLog, isPending: isDeleting } = useDeleteAuditLog();

    const logs = data?.payload.data || [];
    const metadata = data?.payload.metadata || {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 1,
    };

    const handleApplyFilters = (newFilters: Partial<GetAuditLogsParams>) => {
        setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
    };

    const handleClearFilters = () => {
        setFilters({ page: 1, limit: 20 });
    };

    const handlePageChange = (page: number) => {
        setFilters((prev) => ({ ...prev, page }));
    };

    const handleSortChange = (sortBy: string, sortOrder: "asc" | "desc") => {
        setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
    };

    const handleClearLogs = () => {
        const userRole = JSON.parse(localStorage.getItem('user') || '{}')?.role;
        if (userRole !== 'SUPER_ADMIN') {
            toast.error("This action is for Super Admins only.");
            return;
        }
        setDeleteTargetId('ALL');
        setIsModalOpen(true);
    };

    const handleDeleteLog = (id: string) => {
        const userRole = JSON.parse(localStorage.getItem('user') || '{}')?.role;
        if (userRole !== 'SUPER_ADMIN') {
            toast.error("This action is for Super Admins only.");
            return;
        }
        setDeleteTargetId(id);
        setIsModalOpen(true);
    };

    const handleConfirmClear = () => {
        if (deleteTargetId === 'ALL') {
            clearLogs(undefined, {
                onSuccess: () => setIsModalOpen(false)
            });
        } else if (deleteTargetId) {
            deleteLog(deleteTargetId, {
                onSuccess: () => setIsModalOpen(false)
            });
        }
    };

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Audit Log - List</p>
            </div>

            <div className="mt-6 flex flex-col space-y-4">
                <AuditLogPagination
                    page={metadata.page}
                    limit={metadata.limit}
                    total={metadata.total}
                    totalPages={metadata.totalPages}
                    onPageChange={handlePageChange}
                    onClearLogs={handleClearLogs}
                />

                <AuditLogFilters
                    filters={filters}
                    onApplyFilters={handleApplyFilters}
                    onClearFilters={handleClearFilters}
                />

                <AuditLogTable
                    logs={logs}
                    isLoading={isLoading}
                    filters={filters}
                    onSortChange={handleSortChange}
                    onDelete={handleDeleteLog}
                />
            </div>

            <ClearLogsModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onConfirm={handleConfirmClear}
                isClearing={isClearing || isDeleting}
                title={deleteTargetId === 'ALL' ? undefined : "Are you sure you want to delete this log?"}
            />
        </div>
    );
}

export default AdminAuditLogPage;
