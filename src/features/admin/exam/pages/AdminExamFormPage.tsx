import { useNavigate, useParams } from "react-router-dom";
import { X, Save, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import useCreateExam from "../hooks/useCreateExam";
import useUpdateExam from "../hooks/useUpdateExam";
import useExamDetails from "../hooks/useExamDetails";
import ExamForm from "../components/ExamForm";
import ExamQuestionsTable from "../components/ExamQuestionsTable";
import { uploadImage } from "@/features/admin/diplomas/api/uploadImage";
import { toast } from "sonner";
import useAdminDiplomas from "../../hooks/useAdminDiplomas";
import type { ExamFormValues } from "../forms/schema/examSchema";

export default function AdminExamFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  const createExamMutation = useCreateExam();
  const updateExamMutation = useUpdateExam();

  const { data: examData, isLoading: isExamLoading } = useExamDetails(id ?? "");
  const { data: diplomasData } = useAdminDiplomas({ limit: 100 });

  const handleSubmit = async (values: ExamFormValues) => {
    try {
      let imageUrl = "";

      if (typeof values.image === "string") {
        imageUrl = values.image;
      } else if (values.image instanceof File) {
        const uploadResult = await uploadImage(values.image);
        imageUrl = uploadResult.payload?.url || uploadResult.url || "";
      }

      if (!imageUrl) {
        toast.error("Image is required");
        return;
      }

      const payload = {
        title: values.title,
        description: values.description,
        image: imageUrl,
        duration: values.duration,
        diplomaId: values.diplomaId,
      };

      if (isEditMode && id) {
        await updateExamMutation.mutateAsync({ id, values: payload });
        toast.success("Exam updated successfully");
        navigate(`/admin/exams/${id}`);
        return;
      }

      await createExamMutation.mutateAsync(payload);
      toast.success("Exam created successfully");
      navigate("/admin/exams");
    } catch (error) {
      console.error("EXAM SAVE ERROR:", error);
      toast.error(isEditMode ? "Unable to update exam" : "Unable to create exam");
    }
  };

  if (isEditMode && isExamLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
      </div>
    );
  }

  const isSaving = createExamMutation.isPending || updateExamMutation.isPending;
  const diplomas = diplomasData?.payload?.data ?? [];
  const examPayload = examData?.payload?.exam;

  // Build default values from API data (edit mode)
  const defaultValues: ExamFormValues | undefined = examPayload
    ? {
      title: examPayload.title,
      description: examPayload.description,
      image: examPayload.image,
      duration: examPayload.duration,
      diplomaId: examPayload.diplomaId,
    }
    : undefined;

  return (
    <div className="min-h-full w-full ">
      {/* ===== BREADCRUMB ===== */}
      <div className="border-b bg-white px-6 py-3 text-xs">
        <span className="text-gray-400">Exams</span>
        <span className="mx-2 text-gray-400">/</span>
        {isEditMode ? (
          <>
            <span className="text-gray-500">{examPayload?.title}</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-blue-600">Edit</span>
          </>
        ) : (
          <span className="text-blue-600">Add New Exam</span>
        )}
      </div>

      {/* ===== TOP BAR ===== */}
      <div className="flex items-center justify-between bg-white px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            {isEditMode ? examPayload?.title : "Add New Exam"}
          </h1>
          {isEditMode && examPayload?.diploma && (
            <p className="text-xs text-gray-400">
              Diploma:{" "}
              <span className="text-gray-500">{examPayload.diploma.title}</span>
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            className="h-9 rounded border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            onClick={() => navigate(-1)}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>

          <Button
            type="submit"
            form="exam-form"
            disabled={isSaving}
            className="h-9 bg-[#00d084] hover:bg-[#00ba77] text-white font-semibold"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {/* ===== FORM ===== */}
      <div className="p-6">
        <div className="bg-white">
          <div className="bg-blue-600 px-4 py-2">
            <h2 className="text-sm font-semibold text-white">Exam Information</h2>
          </div>

          <ExamForm
            formId="exam-form"
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            diplomas={diplomas}
          />
        </div>

        {/* ===== QUESTIONS (edit mode only) ===== */}
        {isEditMode && id && (
          <div className="mt-6">
            <ExamQuestionsTable examId={id} />
          </div>
        )}
      </div>
    </div>
  );
}