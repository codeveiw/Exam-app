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
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import type { Diploma } from "../types/diploma";
import { MoreHorizontal, Eye, Edit, Trash2, ArrowUpDown, Calendar, Type } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useDeleteDiploma from "@/features/admin/diplomas/hooks/useDeleteDiploma";
import { useState } from "react";

interface DiplomaTableProps {
    diplomas: Diploma[];
    sort?: string;
    onSortChange?: (sort: string) => void;
}

export default function DiplomaTable({ diplomas, sort, onSortChange }: DiplomaTableProps) {

    const deleteDiplomaMutation = useDeleteDiploma();
    const queryClient = useQueryClient();
    const [diplomaToDelete, setDiplomaToDelete] = useState<Diploma | null>(null);

    const handleDelete = () => {
        if (!diplomaToDelete) return;
        deleteDiplomaMutation.mutate(diplomaToDelete.id, {
            onSuccess: (data) => {
                toast.success(data.message || "Diploma deleted successfully");
                queryClient.invalidateQueries({ queryKey: ["admin_diplomas"] });
                setDiplomaToDelete(null);
            },
            onError: (error: any) => {
                const msg = error?.response?.data?.message || error?.message || "Unable to delete diploma";
                console.error("DELETE DIPLOMA ERROR:", error?.response?.data || error);
                toast.error(msg);
                setDiplomaToDelete(null);
            },
        });
    };

    return (
        <>
            <div className="rounded-sm border border-gray-200 bg-white overflow-hidden">
                <Table>
                    <TableHeader className="bg-[#2a75ff]">
                        <TableRow className="hover:bg-[#2a75ff] border-none">
                            <TableHead className="text-white font-semibold h-11 px-4">Image</TableHead>
                            <TableHead className="text-white font-semibold h-11 px-4">Title</TableHead>
                            <TableHead className="text-white font-semibold h-11 px-4 hidden md:table-cell">Description</TableHead>
                            <TableHead className="text-white font-semibold h-11 px-4 text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 hover:bg-[#1a5bcf] hover:text-white text-white font-semibold focus-visible:ring-0 px-2 -mr-2">
                                            Sort <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48 text-gray-700 font-medium">
                                        <DropdownMenuItem
                                            className={`cursor-pointer ${sort === "title-desc" ? "bg-blue-50 text-blue-700" : ""}`}
                                            onSelect={() => onSortChange?.("title-desc")}
                                        >
                                            <Type className={`mr-2 h-4 w-4 ${sort === "title-desc" ? "text-blue-500" : "text-gray-500"}`} /> Title (descending)
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className={`cursor-pointer ${sort === "title-asc" ? "bg-blue-50 text-blue-700" : ""}`}
                                            onSelect={() => onSortChange?.("title-asc")}
                                        >
                                            <Type className={`mr-2 h-4 w-4 ${sort === "title-asc" ? "text-blue-500" : "text-gray-500"}`} /> Title (ascending)
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className={`cursor-pointer ${sort === "newest-desc" ? "bg-blue-50 text-blue-700" : ""}`}
                                            onSelect={() => onSortChange?.("newest-desc")}
                                        >
                                            <Calendar className={`mr-2 h-4 w-4 ${sort === "newest-desc" ? "text-blue-500" : "text-gray-500"}`} /> Newest (descending)
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className={`cursor-pointer ${sort === "newest-asc" ? "bg-blue-50 text-blue-700" : ""}`}
                                            onSelect={() => onSortChange?.("newest-asc")}
                                        >
                                            <Calendar className={`mr-2 h-4 w-4 ${sort === "newest-asc" ? "text-blue-500" : "text-gray-500"}`} /> Newest (ascending)
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {diplomas.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center text-gray-500">
                                    No diplomas found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            diplomas.map((diploma) => (
                                <TableRow key={diploma.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <TableCell className="px-4 py-3">
                                        <img
                                            src={diploma.image}
                                            alt={diploma.title}
                                            className="h-[52px] w-[52px] rounded object-cover shadow-sm"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src =
                                                    "https://placehold.co/100x100?text=No+Image";
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell className="px-4 py-3 font-medium text-gray-800 align-top md:align-middle whitespace-nowrap">
                                        <Link to={`/admin/diplomas/${diploma.id}`}>
                                            {diploma.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell align-top md:align-middle w-1/2">
                                        <p className="line-clamp-2 md:line-clamp-3 leading-relaxed">
                                            {diploma.description || "No description available."}
                                        </p>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-right align-top md:align-middle">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-10 p-0 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded text-gray-500">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-32 py-1">
                                                <DropdownMenuItem asChild>
                                                    <Link to={`/admin/diplomas/${diploma.id}`} className="cursor-pointer flex items-center font-medium text-gray-700">
                                                        <Eye className="mr-2 h-4 w-4 text-[#00d084]" />
                                                        View
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link to={`/admin/diplomas/${diploma.id}/edit`} className="cursor-pointer flex items-center font-medium text-gray-700">
                                                        <Edit className="mr-2 h-4 w-4 text-[#2a75ff]" />
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="cursor-pointer flex items-center font-medium text-red-500 focus:text-red-500 focus:bg-red-50"
                                                    onSelect={() => setDiplomaToDelete(diploma)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
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

            {/* AlertDialog rendered OUTSIDE DropdownMenu to avoid Radix UI conflict */}
            <AlertDialog open={!!diplomaToDelete} onOpenChange={(open) => !open && setDiplomaToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Diploma?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-gray-900">
                                {diplomaToDelete?.title}
                            </span>
                            ? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={deleteDiplomaMutation.isPending}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {deleteDiplomaMutation.isPending ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
