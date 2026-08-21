import {
  Ban,
  Pencil,
  Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import useDiplomaDetails from "../hooks/useDiplomaDetails";
import useDeleteDiploma from "../hooks/useDeleteDiploma";
import { toast } from "sonner";


export default function AdminDiplomaDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate()
  const deleteDiplomaMutation = useDeleteDiploma();
  const { data, isLoading, isError } = useDiplomaDetails(id ?? "");

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading diploma...
        </p>
      </div>
    );
  }

  if (isError || !data?.payload?.diploma) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-red-500">
          Failed to load diploma.
        </p>
      </div>
    );
  }


  const handleDelete = () => {
    if (!id) return;

    deleteDiplomaMutation.mutate(id, {
      onSuccess: (data) => {
        toast.success(
          data.message || "Diploma deleted successfully", {
          style: {
            background: "#000",
            color: "#fff",
            border: "1px solid #000",
          },
        }

        );

        navigate("/admin");
      },

      onError: (error: any) => {
        const msg = error?.response?.data?.message || error?.message || "Unable to delete diploma.";
        console.error("DELETE DIPLOMA ERROR:", error?.response?.data || error);
        toast.error(msg, {
          style: {
            background: "#000",
            color: "#fff",
            border: "1px solid #000",
          },
        });
      },
    });
  };


  const diploma = data?.payload?.diploma;

  return (
    <div className="w-full bg-gray-100 min-h-full">
      {/* Breadcrumb */}
      <div className="border-b bg-white px-6 py-3 text-sm">
        <span className="text-gray-400">
          Diplomas
        </span>

        <span className="mx-2 text-gray-400">
          /
        </span>

        <span className="text-blue-600">
          {diploma.title}
        </span>
      </div>


      <div className="flex items-center justify-between bg-white px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">
          {diploma.title}
        </h1>

        <div className="flex gap-2">

          <Button
            type="button"
            variant="secondary"
            className="rounded-none bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            <Ban className="mr-2 h-4 w-4" />

            {diploma.immutable
              ? "Immutable"
              : "Mutable"}
          </Button>



          <Button
            type="button"
            onClick={() => navigate(`/admin/diplomas/${diploma.id}/edit`)}
            className="rounded-none bg-blue-600 hover:bg-blue-700"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="destructive"
                className="rounded-none"
                disabled={deleteDiplomaMutation.isPending}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete Diploma?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-gray-900">
                    {diploma.title}
                  </span>
                  ? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={deleteDiplomaMutation.isPending}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {deleteDiplomaMutation.isPending
                    ? "Deleting..."
                    : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>


      <div className="p-6">
        <div className="bg-white p-6">

          <div className="mb-5">
            <p className="mb-2 text-sm text-gray-400">
              Image
            </p>

            <img
              src={diploma.image}
              alt={diploma.title}
              className="h-[280px] w-[280px] object-cover"
            />
          </div>


          <div className="mb-5">
            <p className="mb-1 text-sm text-gray-400">
              Title
            </p>

            <p className="text-sm text-gray-900">
              {diploma.title}
            </p>
          </div>


          <div>
            <p className="mb-1 text-sm text-gray-400">
              Description
            </p>

            <p className="max-w-6xl text-sm leading-6 text-gray-800">
              {diploma.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}