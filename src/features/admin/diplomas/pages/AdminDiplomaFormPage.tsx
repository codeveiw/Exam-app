
import { useNavigate, useParams } from "react-router-dom";


import DiplomaForm from "../components/DiplomaForm";

import useCreateDiploma from "../hooks/useCreateDiploma";
import useDiplomaDetails from "../hooks/useDiplomaDetails";
import useUpdateDiploma from "../hooks/useUpdateDiploma";

import type { DiplomaFormValues } from "../form/schema/diplomaSchema";
import { toast } from "sonner";
import useUploadImage from "../hooks/useUploadImage";

export default function AdminDiplomaFormPage() {
  const { id } = useParams<{ id: string }>();
  const uploadImageMutation = useUploadImage();

  const navigate = useNavigate();


  const isEditMode = Boolean(id);

  const createDiplomaMutation = useCreateDiploma();

  const updateDiplomaMutation = useUpdateDiploma();

  const {
    data,
    isLoading: isDiplomaLoading,
    isError: isDiplomaError,
  } = useDiplomaDetails(id ?? "");

  const diploma = data?.payload?.diploma;

  const isPending =
    createDiplomaMutation.isPending ||
    updateDiplomaMutation.isPending;

  const handleSubmit = async (values: DiplomaFormValues) => {
    try {
      let imageUrl = values.image;

      if (values.image instanceof File) {
        const uploadResult = await uploadImageMutation.mutateAsync(values.image);
        imageUrl = uploadResult.payload?.url || uploadResult.url || "";
      }

      if (!imageUrl) {
        toast.error("Please select an image");
        return;
      }

      if (isEditMode && id) {
        await updateDiplomaMutation.mutateAsync({
          id,
          data: {
            title: values.title,
            description: values.description,
            image: imageUrl as string,
          }
        });
        toast.success("Diploma updated successfully");
        navigate(`/admin/diplomas/${id}`);
        return;
      }

      const data = await createDiplomaMutation.mutateAsync({
        title: values.title,
        description: values.description,
        image: imageUrl as string,
      });

      toast.success("Diploma created successfully");
      if (data?.diploma?.id) {
        navigate(`/admin/diplomas/${data.diploma.id}`);
      } else {
        navigate("/admin");
      }
    } catch (error) {
      console.error("DIplOMA SAVE ERROR:", error);
      toast.error(isEditMode ? "Unable to update diploma" : "Unable to create diploma");
    }
  };

  if (isEditMode && isDiplomaLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading diploma...
        </p>
      </div>
    );
  }


  if (isEditMode && (isDiplomaError || !diploma)) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-red-500">
          Failed to load diploma.
        </p>
      </div>
    );
  }


  const defaultValues: DiplomaFormValues = {
    title: diploma?.title ?? "",
    description: diploma?.description ?? "",
    image: diploma?.image ?? "",
  };

  return (
    <div className="min-h-full bg-gray-100">
      {/* Breadcrumb */}
      <div className="border-b bg-white px-6 py-3 text-sm">
        <span className="text-gray-400">
          Diplomas
        </span>

        <span className="mx-2 text-gray-400">
          /
        </span>

        <span className="text-blue-600">
          {isEditMode
            ? "Edit Diploma"
            : "Add New Diploma"}
        </span>
      </div>


      <div className="flex items-center justify-between bg-white px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">
          {isEditMode
            ? "Edit Diploma"
            : "Add New Diploma"}
        </h1>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="flex items-center gap-1 border px-4 py-2 text-sm hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="diploma-form"
            disabled={isPending}
            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm font-medium disabled:opacity-60"
          >
            {isPending
              ? isEditMode ? "Updating..." : "Saving..."
              : isEditMode ? "Update" : "Save"}
          </button>
        </div>
      </div>


      <div className="p-6">
        <div className="bg-white p-6">

          <div className="mb-6 bg-blue-600 px-4 py-2 text-sm font-medium text-white">
            Diploma Information
          </div>

          <DiplomaForm
            formId="diploma-form"
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}