import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useAuditLogDetails from "../hooks/useAuditLogDetails";
import useDeleteAuditLog from "../hooks/useDeleteAuditLog";
import { ClearLogsModal } from "../components/ClearLogsModal";

export function AdminAuditLogDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, isLoading, isError } = useAuditLogDetails(id!);
    const { mutate: deleteLog, isPending: isDeleting } = useDeleteAuditLog();

    const log = data?.payload.auditLog;

    const handleDelete = () => {
        const userRole = JSON.parse(localStorage.getItem("user") || "{}")?.role;
        if (userRole !== "SUPER_ADMIN") {
            toast.error("This action is for Super Admins only.");
            return;
        }
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (!id) return;
        deleteLog(id, {
            onSuccess: () => {
                setIsModalOpen(false);
                navigate("/admin/audit-log");
            },
        });
    };

    const getActionColor = (action: string) => {
        switch (action) {
            case "CREATE": return "text-green-600";
            case "UPDATE":
            case "SET_IMMUTABLE": return "text-orange-500";
            case "DELETE": return "text-red-500";
            default: return "text-gray-600";
        }
    };

    const getRoleColor = (role: string) => {
        return role === "SUPER_ADMIN" ? "text-red-500" : "text-blue-500";
    };

    const capitalize = (str: string) => {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const formatTime = (dateStr: string) => {
        return new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        }).format(new Date(dateStr));
    };

    const formatDate = (dateStr: string) => {
        return new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(new Date(dateStr));
    };

    const getBreadcrumbTitle = () => {
        if (!log) return "Loading...";
        return `${capitalize(log.entityType)} ${capitalize(log.action)} By ${log.actorUsername}`;
    };

    const getUpdatedFields = () => {
        if (!log?.metadata) return null;
        const keys = Object.keys(log.metadata);
        if (keys.length === 0) return null;
        return keys.join(", ");
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            </div>
        );
    }

    if (isError || !log) {
        return (
            <div className="p-8 text-center text-red-500 font-medium">
                Failed to load audit log entry.
            </div>
        );
    }

    return (
        <div className="flex-1 p-4 md:p-8 pt-6">
            <div className="flex items-center gap-1 text-sm text-gray-500 mb-6 font-mono">
                <Link to="/admin/audit-log" className="hover:text-blue-600 transition-colors">
                    Audit Log
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-blue-500 font-medium">{getBreadcrumbTitle()}</span>
            </div>

            <div className="bg-white border rounded-md shadow-sm">
                <div className="flex items-start justify-between p-6 border-b">
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">{getBreadcrumbTitle()}</h1>
                        <div className="flex items-center gap-1 text-sm mt-1">
                            <span className="text-gray-500">Entity:</span>
                            <a
                                href="#"
                                className="text-blue-500 hover:underline flex items-center gap-0.5"
                            >
                                {capitalize(log.entityType)} [{log.entityId}]
                                <ArrowUpRight className="h-3 w-3" />
                            </a>
                        </div>
                    </div>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="gap-2 bg-red-600 hover:bg-red-700"
                    >
                        <Trash2 className="h-4 w-4" />
                        Delete
                    </Button>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Action</p>
                        <p className={`font-bold text-sm ${getActionColor(log.action)}`}>{log.action}</p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Method</p>
                        <p className="text-sm text-gray-800">{log.httpMethod}</p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">User</p>
                        <div className="space-y-0.5">
                            <p className="text-sm font-semibold text-gray-900">{log.actorUsername}</p>
                            <p className="text-xs text-gray-500">Email: {log.actorEmail}</p>
                            {log.ipAddress && (
                                <p className="text-xs text-gray-500">IP Address: {log.ipAddress}</p>
                            )}
                            <p className="text-xs">
                                Role:{" "}
                                <span className={`font-semibold ${getRoleColor(log.actorRole)}`}>
                                    {log.actorRole === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Entity</p>
                        <div className="flex items-center gap-1 text-sm text-gray-700">
                            <span>{capitalize(log.entityType)}:</span>
                            <a href="#" className="text-gray-600 hover:text-blue-500 flex items-center gap-0.5">
                                {log.entityId}
                                <ArrowUpRight className="h-3 w-3" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Date & Time</p>
                        <p className="text-sm text-gray-800">
                            {formatTime(log.createdAt)} | {formatDate(log.createdAt)}
                        </p>
                    </div>

                    {getUpdatedFields() && (
                        <div>
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Updated Fields</p>
                            <p className="text-sm text-gray-800">{getUpdatedFields()}</p>
                        </div>
                    )}

                    <div>
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Metadata</p>
                        <pre className="bg-gray-100 rounded-md p-4 text-xs text-gray-700 overflow-x-auto font-mono whitespace-pre-wrap break-all">
                            {JSON.stringify(log.metadata, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>

            <ClearLogsModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onConfirm={handleConfirmDelete}
                isClearing={isDeleting}
                title="Are you sure you want to delete this log?"
            />
        </div>
    );
}

export default AdminAuditLogDetailsPage;
