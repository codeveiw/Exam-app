import {
  Ban,
  Pencil,
  Trash2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import useQuestionDetails from "../hooks/useQuestionDetails";
import { useNavigate } from "react-router-dom";
import useDeleteQuestion from "../hooks/useDeleteQuestion";
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

export default function AdminQuestionDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const deleteQuestionMutation = useDeleteQuestion();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const {
    data,
    isLoading,
    isError,
  } = useQuestionDetails(id ?? "");

  const handleDelete = () => {
    if (!id) return;
    if (!data?.payload?.question) return;

    deleteQuestionMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Question deleted successfully");
        navigate(`/admin/exams/${data.payload.question.exam.id}`);
      },

      onError: () => {
        toast.error("Unable to delete question");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading question...
        </p>
      </div>
    );
  }

  if (isError || !data?.payload?.question) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-red-500">
          Failed to load question.
        </p>
      </div>
    );
  }

  const question = data?.payload?.question;

  return (
    <div className="min-h-full w-full bg-gray-100">

      <div className="border-b bg-white px-6 py-3 text-sm">
        <span className="text-gray-400">
          Exams
        </span>

        <span className="mx-2 text-gray-400">
          /
        </span>

        <Link
          to={`/admin/exams/${question.exam.id}`}
          className="text-blue-600 hover:underline"
        >
          {question.exam.title}
        </Link>

        <span className="mx-2 text-gray-400">
          /
        </span>

        <span className="text-blue-600">
          Questions
        </span>

        <span className="mx-2 text-gray-400">
          /
        </span>

        <span className="text-blue-600">
          {question.text}
        </span>
      </div>


      <div className="flex items-center justify-between bg-white px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            {question.text}
          </h1>

          <p className="text-sm text-gray-400">
            Exam:{" "}
            <Link
              to={`/admin/exams/${question.exam.id}`}
              className="text-blue-600 hover:underline"
            >
              {question.exam.title}
            </Link>
          </p>
        </div>

        <div className="flex gap-2">

          <Button
            type="button"
            variant="secondary"
            className="rounded-none bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            <Ban className="mr-2 h-4 w-4" />

            {question.immutable
              ? "Immutable"
              : "Mutable"}
          </Button>


          <Button
            type="button"
            className="rounded-none bg-blue-600 hover:bg-blue-700"
            asChild
          >
            <Link to={`/admin/questions/${question.id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>


          <Button
            type="button"
            variant="destructive"
            className="rounded-none"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
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

      <div className="p-6">
        <div className="bg-white p-6">

          <div className="mb-6">
            <p className="mb-1 text-sm text-gray-400">
              Headline
            </p>

            <p className="text-sm text-black font-mono font-normal">
              {question.text}
            </p>
          </div>


          <div className="mb-6">
            <p className="mb-1 text-sm text-gray-400">
              Exam
            </p>

            <Link
              to={`/admin/exams/${question.exam.id}`}
              className="text-sm text-black font-mono font-normal hover:underline"
            >
              {question.exam.title}
            </Link>
          </div>


          <div>
            <p className="mb-1 text-sm text-gray-400">
              Answers
            </p>

            <p className="text-sm text-black font-mono font-normal">
              {question.answers.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}