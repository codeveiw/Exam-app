import { useNavigate } from "react-router-dom";
import { MoreHorizontal, ArrowUpRight, SortAsc, SortDesc, Trash2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { AuditLogEntry, GetAuditLogsParams } from "../types/auditLog";

interface AuditLogTableProps {
    logs: AuditLogEntry[];
    isLoading: boolean;
    filters: GetAuditLogsParams;
    onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
    onDelete?: (id: string) => void;
}

export function AuditLogTable({ logs, isLoading, onSortChange, onDelete }: AuditLogTableProps) {
    const navigate = useNavigate();
    const getActionColor = (action: string) => {
        switch (action) {
            case "CREATE":
                return "text-green-600";
            case "UPDATE":
            case "SET_IMMUTABLE":
                return "text-orange-500";
            case "DELETE":
                return "text-red-500";
            default:
                return "text-gray-600";
        }
    };

    const getMethodColor = () => {
        return "text-gray-400 font-normal";
    };

    const getRoleColor = (role: string) => {
        return role === "SUPER_ADMIN" ? "text-red-500" : "text-blue-500";
    };

    const capitalize = (str: string) => {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const handleSortMenu = (field: string, order: "asc" | "desc") => {
        onSortChange(field, order);
    };

    return (
        <div className="border rounded-md bg-white overflow-hidden shadow-sm">
            <Table>
                <TableHeader className="bg-blue-600 hover:bg-blue-600">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="text-white font-semibold">Action</TableHead>
                        <TableHead className="text-white font-semibold">User</TableHead>
                        <TableHead className="text-white font-semibold">Entity</TableHead>
                        <TableHead className="text-white font-semibold">Time</TableHead>
                        <TableHead className="text-white font-semibold text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-6 w-auto p-1 text-white hover:text-white hover:bg-blue-700">
                                        Sort <SortDesc className="ml-1 h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 text-xs">
                                    <DropdownMenuItem onClick={() => handleSortMenu("action", "desc")} className="py-2">
                                        <SortDesc className="mr-2 h-3 w-3" /> Action <span className="ml-1 text-gray-400">(descending)</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleSortMenu("action", "asc")} className="py-2">
                                        <SortAsc className="mr-2 h-3 w-3" /> Action <span className="ml-1 text-gray-400">(ascending)</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleSortMenu("user", "desc")} className="py-2">
                                        <SortDesc className="mr-2 h-3 w-3" /> User <span className="ml-1 text-gray-400">(descending)</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleSortMenu("user", "asc")} className="py-2">
                                        <SortAsc className="mr-2 h-3 w-3" /> User <span className="ml-1 text-gray-400">(ascending)</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleSortMenu("entity", "desc")} className="py-2">
                                        <SortDesc className="mr-2 h-3 w-3" /> Entity <span className="ml-1 text-gray-400">(descending)</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleSortMenu("entity", "asc")} className="py-2">
                                        <SortAsc className="mr-2 h-3 w-3" /> Entity <span className="ml-1 text-gray-400">(ascending)</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleSortMenu("createdAt", "desc")} className="py-2">
                                        <SortDesc className="mr-2 h-3 w-3" /> Newest <span className="ml-1 text-gray-400">(descending)</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleSortMenu("createdAt", "asc")} className="py-2">
                                        <SortAsc className="mr-2 h-3 w-3" /> Newest <span className="ml-1 text-gray-400">(ascending)</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                Loading logs...
                            </TableCell>
                        </TableRow>
                    ) : logs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                No logs found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        logs.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell className="align-top py-4">
                                    <div className={`font-bold text-sm ${getActionColor(log.action)}`}>
                                        {log.action}
                                    </div>
                                    <div className={`text-xs mt-1 ${getMethodColor()}`}>
                                        Method: {log.httpMethod || "N/A"}
                                    </div>
                                </TableCell>
                                <TableCell className="align-top py-4">
                                    <div className="font-semibold text-sm text-gray-900">{log.actorUsername || "System"}</div>
                                    <div className="text-xs text-gray-500 my-0.5">{log.actorEmail}</div>
                                    <div className={`text-xs font-semibold ${getRoleColor(log.actorRole)}`}>
                                        {log.actorRole === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
                                    </div>
                                </TableCell>
                                <TableCell className="align-top py-4">
                                    <div className="font-semibold text-sm text-gray-900">{capitalize(log.entityType)}</div>
                                    <div className="text-xs text-gray-400 mt-1 flex items-center group cursor-pointer hover:text-blue-500 w-fit">
                                        {log.entityId} <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </TableCell>
                                <TableCell className="align-top py-4 text-sm text-gray-900 font-medium">
                                    <div>
                                        {new Intl.DateTimeFormat("en-US", {
                                            hour: "numeric",
                                            minute: "2-digit",
                                            second: "2-digit",
                                            hour12: true,
                                        }).format(new Date(log.createdAt))}
                                    </div>
                                    <div className="text-xs text-gray-500 font-normal mt-1 flex items-center">
                                        {new Intl.DateTimeFormat("en-US", {
                                            weekday: "short",
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        }).format(new Date(log.createdAt))}
                                    </div>
                                </TableCell>
                                <TableCell className="align-top py-4 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 bg-gray-100/50 hover:bg-gray-200">
                                                <MoreHorizontal className="h-4 w-4 text-gray-500" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                className="text-green-600 font-medium text-xs"
                                                onClick={() => navigate(`/admin/audit-log/${log.id}`)}
                                            >
                                                <svg className="w-3.5 h-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                View
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-red-500 font-medium text-xs"
                                                onClick={() => onDelete && onDelete(log.id)}
                                            >
                                                <Trash2 className="w-3.5 h-3.5 mr-2" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
