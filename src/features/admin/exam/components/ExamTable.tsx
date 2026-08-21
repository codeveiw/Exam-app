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
import type { Exam } from "../types/exam";
import { MoreHorizontal, Eye, Edit, Trash2, ArrowUpDown, Calendar } from "lucide-react";
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
import { useState } from "react";
import useDeleteExam from "../hooks/useDeleteExam";

interface ExamTableProps {
    exams: Exam[];
    sort?: string;
    onSortChange?: (sort: string) => void;
}

export default function ExamTable({ exams, sort, onSortChange }: ExamTableProps) {
    const [examToDelete, setExamToDelete] = useState<Exam | null>(null);
    const { mutateAsync: deleteExam, isPending: isDeleting } = useDeleteExam();

    const handleDelete = async () => {
        if (!examToDelete) return;

        try {
            await deleteExam(examToDelete.id);
            toast.success("Exam deleted successfully");
            setExamToDelete(null);
        } catch (error) {
            // Error is handled in the hook
        }
    };

    return (
        <>
            <div className="rounded-sm border border-gray-200 bg-white overflow-hidden">
                <Table>
                    <TableHeader className="bg-[#2a75ff]">
                        <TableRow className="hover:bg-[#2a75ff] border-none">
                            <TableHead className="text-white font-semibold h-11 px-4">Image</TableHead>
                            <TableHead className="text-white font-semibold h-11 px-4">Title</TableHead>
                            <TableHead className="text-white font-semibold h-11 px-4 hidden md:table-cell">Diploma</TableHead>
                            <TableHead className="text-white font-semibold h-11 px-4">No. of Questions</TableHead>
                            <TableHead className="text-white font-semibold h-11 px-4 text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 hover:bg-[#1a5bcf] hover:text-white text-white font-semibold focus-visible:ring-0 px-2 -mr-2">
                                            Sort <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 text-gray-700 font-medium">
                                        <DropdownMenuItem
                                            className={`cursor-pointer ${sort === "title-desc" ? "bg-blue-50 text-blue-700" : ""}`}
                                            onSelect={() => onSortChange?.("title-desc")}
                                        >
                                            <ArrowUpDown className={`mr-2 h-4 w-4 ${sort === "title-desc" ? "text-blue-500" : "text-gray-500"}`} /> Title <span className="text-gray-400 text-xs ml-1">(descending)</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className={`cursor-pointer ${sort === "title-asc" ? "bg-blue-50 text-blue-700" : ""}`}
                                            onSelect={() => onSortChange?.("title-asc")}
                                        >
                                            <ArrowUpDown className={`mr-2 h-4 w-4 ${sort === "title-asc" ? "text-blue-500" : "text-gray-500"}`} /> Title <span className="text-gray-400 text-xs ml-1">(ascending)</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className={`cursor-pointer ${sort === "questions-desc" ? "bg-blue-50 text-blue-700" : ""}`}
                                            onSelect={() => onSortChange?.("questions-desc")}
                                        >
                                            <ArrowUpDown className={`mr-2 h-4 w-4 ${sort === "questions-desc" ? "text-blue-500" : "text-gray-500"}`} /> Questions No. <span className="text-gray-400 text-xs ml-1">(descending)</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className={`cursor-pointer ${sort === "questions-asc" ? "bg-blue-50 text-blue-700" : ""}`}
                                            onSelect={() => onSortChange?.("questions-asc")}
                                        >
                                            <ArrowUpDown className={`mr-2 h-4 w-4 ${sort === "questions-asc" ? "text-blue-500" : "text-gray-500"}`} /> Questions No. <span className="text-gray-400 text-xs ml-1">(ascending)</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className={`cursor-pointer ${sort === "newest-desc" ? "bg-blue-50 text-blue-700" : ""}`}
                                            onSelect={() => onSortChange?.("newest-desc")}
                                        >
                                            <Calendar className={`mr-2 h-4 w-4 ${sort === "newest-desc" ? "text-blue-500" : "text-gray-500"}`} /> Newest <span className="text-gray-400 text-xs ml-1">(descending)</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className={`cursor-pointer ${sort === "newest-asc" ? "bg-blue-50 text-blue-700" : ""}`}
                                            onSelect={() => onSortChange?.("newest-asc")}
                                        >
                                            <Calendar className={`mr-2 h-4 w-4 ${sort === "newest-asc" ? "text-blue-500" : "text-gray-500"}`} /> Newest <span className="text-gray-400 text-xs ml-1">(ascending)</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {exams.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                                    No exams found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            exams.map((exam) => (
                                <TableRow key={exam.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <TableCell className="px-4 py-3">
                                        <img
                                            src={exam.image}
                                            alt={exam.title}
                                            className="h-[52px] w-[52px] rounded object-cover shadow-sm"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src =
                                                    "https://placehold.co/100x100?text=No+Image";
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell className="px-4 py-3 font-medium text-gray-800 align-top md:align-middle whitespace-nowrap">
                                        <Link to={`/admin/exams/${exam.id}`}>
                                            {exam.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-sm hidden md:table-cell align-top md:align-middle">
                                        {exam.diploma?.title || "—"}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-sm align-top md:align-middle">
                                        {exam.questionsCount}
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
                                                    <Link to={`/admin/exams/${exam.id}`} className="cursor-pointer flex items-center font-medium text-gray-700">
                                                        <Eye className="mr-2 h-4 w-4 text-[#00d084]" />
                                                        View
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link to={`/admin/exams/${exam.id}/edit`} className="cursor-pointer flex items-center font-medium text-gray-700">
                                                        <Edit className="mr-2 h-4 w-4 text-[#2a75ff]" />
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="cursor-pointer flex items-center font-medium text-red-500 focus:text-red-500 focus:bg-red-50"
                                                    onSelect={() => setExamToDelete(exam)}
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

            <AlertDialog open={!!examToDelete} onOpenChange={(open) => !open && setExamToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Exam?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-gray-900">
                                {examToDelete?.title}
                            </span>
                            ? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
