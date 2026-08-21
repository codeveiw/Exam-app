import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuditLogPaginationProps {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onClearLogs?: () => void;
}

export function AuditLogPagination({
    page,
    limit,
    total,
    totalPages,
    onPageChange,
    onClearLogs,
}: AuditLogPaginationProps) {
    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);
    const isTotalZero = total === 0;

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                    {isTotalZero ? "0 - 0" : `${start} - ${end}`} of {total}
                </span>
                <div className="flex items-center gap-1">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onPageChange(page - 1)}
                        disabled={page <= 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex h-8 items-center bg-muted/50 px-3 text-sm text-muted-foreground rounded-md border">
                        Page {page} of {totalPages === 0 ? 1 : totalPages}
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onPageChange(page + 1)}
                        disabled={page >= totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            {onClearLogs && (
                <Button variant="destructive" size="sm" onClick={onClearLogs} className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Clear All Logs
                </Button>
            )}
        </div>
    );
}
