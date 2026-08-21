import { useState } from "react";
import { Settings2, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { GetAuditLogsParams } from "../types/auditLog";

interface AuditLogFiltersProps {
    filters: GetAuditLogsParams;
    onApplyFilters: (filters: Partial<GetAuditLogsParams>) => void;
    onClearFilters: () => void;
}

export function AuditLogFilters({ filters, onApplyFilters, onClearFilters }: AuditLogFiltersProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [localFilters, setLocalFilters] = useState<Partial<GetAuditLogsParams>>({
        category: filters.category || "all",
        action: filters.action || "all",
        search: filters.search || "",
    });

    const handleApply = () => {
        onApplyFilters({
            category: localFilters.category === "all" ? undefined : localFilters.category,
            action: localFilters.action === "all" ? undefined : localFilters.action,
            search: localFilters.search || undefined,
            page: 1,
        });
    };

    const handleClear = () => {
        setLocalFilters({ category: "all", action: "all", search: "" });
        onClearFilters();
    };

    return (
        <div className="border rounded-md mb-4 bg-white shadow-sm overflow-hidden">
            <div
                className="flex items-center justify-between px-4 py-2 bg-blue-600 text-white cursor-pointer select-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2">
                    <Settings2 className="h-4 w-4" />
                    <span className="font-semibold text-sm">Search & Filters</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                    {isOpen ? <><ChevronUp className="h-4 w-4" /> Hide</> : <><ChevronDown className="h-4 w-4" /> Show</>}
                </div>
            </div>

            {isOpen && (
                <div className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Select
                            value={localFilters.category}
                            onValueChange={(val) => setLocalFilters(prev => ({ ...prev, category: val }))}
                        >
                            <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Any Category</SelectItem>
                                <SelectItem value="DIPLOMA">Diploma</SelectItem>
                                <SelectItem value="EXAM">Exam</SelectItem>
                                <SelectItem value="QUESTION">Question</SelectItem>
                                <SelectItem value="USER">User</SelectItem>
                                <SelectItem value="SYSTEM">System</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={localFilters.action}
                            onValueChange={(val) => setLocalFilters(prev => ({ ...prev, action: val }))}
                        >
                            <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Action" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Any Action</SelectItem>
                                <SelectItem value="CREATE">Create</SelectItem>
                                <SelectItem value="UPDATE">Update</SelectItem>
                                <SelectItem value="DELETE">Delete</SelectItem>
                                <SelectItem value="SET_IMMUTABLE">Set Immutable</SelectItem>
                                <SelectItem value="SEED_DATA">Seed Data</SelectItem>
                            </SelectContent>
                        </Select>

                        <Input
                            placeholder="Search user, email, ID..."
                            value={localFilters.search}
                            onChange={(e) => setLocalFilters(prev => ({ ...prev, search: e.target.value }))}
                            className="bg-white"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t text-sm">
                        <Button variant="ghost" onClick={handleClear} size="sm" className="h-8">
                            Clear
                        </Button>
                        <Button variant="secondary" onClick={handleApply} size="sm" className="h-8 bg-gray-200 text-gray-800 hover:bg-gray-300">
                            Apply
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
