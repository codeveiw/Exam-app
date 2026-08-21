import { useState } from "react";
import { MoreHorizontal, Plus, ArrowDownWideNarrow, Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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

import useExamQuestions from "../hooks/useExamQuestions";
import useDeleteQuestion from "@/features/questions/hooks/useDeleteQuestion";

interface ExamQuestionsTableProps {
  examId: string;
}

export default function ExamQuestionsTable({
  examId,
}: ExamQuestionsTableProps) {
  const {
    data,
    isLoading,
    isError,
  } = useExamQuestions(examId);

  const deleteQuestionMutation = useDeleteQuestion();
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);

  const handleDelete = () => {
    if (!questionToDelete) return;
    deleteQuestionMutation.mutate(questionToDelete, {
      onSuccess: () => {
        toast.success("Question deleted successfully");
        setQuestionToDelete(null);
      },
      onError: () => {
        toast.error("Unable to delete question");
        setQuestionToDelete(null);
      }
    });
  };

  const questions = data?.payload.questions ?? [];

  if (isLoading) {
    return (
      <div className="mt-6 bg-white p-6">
        <p className="text-sm text-gray-500">
          Loading questions...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-6 bg-white p-6">
        <p className="text-sm text-red-500">
          Failed to load questions.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full border-t border-gray-100">


      <div className="flex items-center justify-between bg-blue-600 px-4 py-3 text-white">

        <h2 className="text-sm font-semibold">
          Exam Questions
        </h2>

        <Button
          type="button"
          variant="ghost"
          asChild
          className="rounded-none text-white hover:bg-blue-700 hover:text-white"
        >
          <Link to={`/admin/exams/${examId}/questions/add`}>
            <Plus className="mr-2 h-4 w-4" />
            Add Questions
          </Link>
        </Button>

      </div>


      {questions.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-sm text-gray-500">
            No questions found.
          </p>
        </div>
      ) : (
        <>
          <Table>

            <TableHeader>
              <TableRow className="rounded-none bg-gray-200 hover:bg-gray-200">

                <TableHead className="text-xs font-semibold text-gray-700">
                  Title
                </TableHead>

                <TableHead className="w-[100px] text-right text-xs font-semibold text-gray-700">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-blue-600 transition-colors">
                        Sort <ArrowDownWideNarrow className="h-3 w-3" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="text-gray-700 font-medium">
                      <DropdownMenuItem className="cursor-pointer">
                        Title (descending)
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        Title (ascending)
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        Newest (descending)
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        Newest (ascending)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>

              </TableRow>
            </TableHeader>

            <TableBody>

              {questions.map((question) => (
                <TableRow key={question.id}>

                  <TableCell className="text-sm text-gray-800 font-medium">
                    <Link to={`/admin/questions/${question.id}`} className="hover:underline hover:text-blue-600">
                      {question.text}
                    </Link>
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none bg-gray-100"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32 py-1">
                        <DropdownMenuItem asChild className="cursor-pointer flex items-center font-medium text-gray-700">
                          <Link to={`/admin/questions/${question.id}`}>
                            <Eye className="mr-2 h-4 w-4 text-[#00d084]" />
                            View
                          </Link>
                        </DropdownMenuItem>


                        <DropdownMenuItem asChild className="cursor-pointer flex items-center font-medium text-gray-700">
                          <Link to={`/admin/questions/${question.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4 text-[#2a75ff]" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer flex items-center font-medium text-red-500 hover:text-red-600 focus:text-red-500 focus:bg-red-50"
                          onClick={() => setQuestionToDelete(question.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>

                </TableRow>
              ))}

            </TableBody>

          </Table>

          <AlertDialog open={!!questionToDelete} onOpenChange={(open) => !open && setQuestionToDelete(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Question?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this question? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={deleteQuestionMutation.isPending}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {deleteQuestionMutation.isPending ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}

    </div>
  );
}