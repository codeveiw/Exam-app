import {
  Ban,
  Pencil,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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
import useExamDetails from "../hooks/useExamDetails";
import useDeleteExam from "../hooks/useDeleteExam";
import ExamQuestionsTable from "../components/ExamQuestionsTable";

export default function AdminExamDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { mutateAsync: deleteExam, isPending: isDeleting } = useDeleteExam();

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteExam(id);
      toast.success("Exam deleted successfully");
      navigate("/admin/exams");
    } catch (error) {
      // Error handled in hook
    }
  };

  const {
    data,
    isLoading,
    isError,
  } = useExamDetails(id ?? "");

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading exam...
        </p>
      </div>
    );
  }

  if (isError || !data?.payload?.exam) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-red-500">
          Failed to load exam.
        </p>
      </div>
    );
  }

  const exam = data.payload.exam;

  return (
    <div className="min-h-full w-full bg-gray-100">

      {/* Breadcrumb */}
      <div className="border-b bg-white px-6 py-3 text-sm">
        <span className="text-gray-400">
          Exams
        </span>

        <span className="mx-2 text-gray-400">
          /
        </span>

        <span className="text-blue-600">
          {exam.title}
        </span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between bg-white px-6 py-4">

        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            {exam.title}
          </h1>

          <div className="mt-1 flex items-center gap-1 text-sm text-gray-400">
            <span>Diploma:</span>

            <Link
              to={`/admin/diplomas/${exam.diploma.id}`}
              className="text-gray-500 hover:text-blue-600"
            >
              {exam.diploma.title}

              <ExternalLink className="ml-1 inline h-3 w-3" />
            </Link>
          </div>
        </div>

        <div className="flex gap-2">

          {/* Immutable */}
          <Button
            type="button"
            variant="secondary"
            className="rounded-none bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            <Ban className="mr-2 h-4 w-4" />

            {exam.immutable
              ? "Immutable"
              : "Mutable"}
          </Button>

          {/* Edit */}
          <Button
            type="button"
            className="rounded-none bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate(`/admin/exams/${exam.id}/edit`)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>

          {/* Delete */}
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
            <AlertDialogTitle>Delete Exam?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">{exam.title}</span>?
              This action cannot be undone.
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

      {/* Exam Information & Questions */}
      <div className="p-6">
        <div className="bg-white">
          <div className="p-6">
            {/* Image */}
            <div className="mb-5">
              <p className="mb-2 text-sm text-gray-400">Image</p>
              <img
                src={exam.image}
                alt={exam.title}
                className="h-[280px] w-[280px] object-cover"
              />
            </div>

            {/* Title */}
            <div className="mb-5">
              <p className="mb-1 text-sm text-gray-400">Title</p>
              <p className="text-sm text-gray-900">{exam.title}</p>
            </div>

            {/* Description */}
            <div className="mb-5">
              <p className="mb-1 text-sm text-gray-400">Description</p>
              <p className="max-w-6xl text-sm leading-6 text-gray-800">
                {exam.description}
              </p>
            </div>

            {/* Diploma */}
            <div className="mb-5">
              <p className="mb-1 text-sm text-gray-400">Diploma</p>
              <Link
                to={`/admin/diplomas/${exam.diploma.id}`}
                className="text-sm text-gray-900 hover:text-blue-600"
              >
                {exam.diploma.title}
                <ExternalLink className="ml-1 inline h-3 w-3" />
              </Link>
            </div>

            {/* Duration */}
            <div className="mb-5">
              <p className="mb-1 text-sm text-gray-400">Duration</p>
              <p className="text-sm text-gray-900">{exam.duration} Minutes</p>
            </div>

            {/* Questions Count */}
            <div>
              <p className="mb-1 text-sm text-gray-400">No. of Questions</p>
              <p className="text-sm text-gray-900">{exam.questionsCount}</p>
            </div>
          </div>

          <ExamQuestionsTable examId={exam.id} />
        </div>
      </div>
    </div>
  );
}