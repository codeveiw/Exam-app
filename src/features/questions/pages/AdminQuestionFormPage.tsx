import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";

import QuestionForm from "../components/QuestionForm";
import BulkQuestionForm from "../components/BulkQuestionForm";

import useQuestionDetails from "../hooks/useQuestionDetails";
import useCreateQuestion from "../hooks/useCreateQuestion";
import useUpdateQuestion from "../hooks/useUpdateQuestion";
import useCreateBulkQuestions from "../hooks/useCreateBulkQuestions";
import useExams from "@/features/admin/exam/hooks/useExams";
import {
  type QuestionFormValues,
  type BulkQuestionsFormValues,
} from "../types/question";
import { questionSchema } from "../form/schema/questionSchema";
import { bulkQuestionSchema } from "../form/schema/bulkQuestionSchema";


export default function AdminQuestionFormPage() {
  const navigate = useNavigate();

  const { examId, id } = useParams<{
    examId?: string;
    id?: string;
  }>();

  const isEditMode = Boolean(id);
  const [isBulkMode, setIsBulkMode] = useState(false);

  /* =========================
     FORMS
  ========================= */

  const singleForm = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      examId: examId ?? "",
      text: "",
      answers: [
        { text: "", isCorrect: true },
        { text: "", isCorrect: false },
      ],
    },
  });

  const bulkForm = useForm<BulkQuestionsFormValues>({
    resolver: zodResolver(bulkQuestionSchema),
    defaultValues: {
      examId: examId ?? "",
      questions: [
        {
          text: "",
          answers: [
            { text: "", isCorrect: true },
            { text: "", isCorrect: false },
          ],
        },
      ],
    },
  });

  /* =========================
     GET QUESTION - EDIT
  ========================= */

  const {
    data: questionData,
    isLoading: isLoadingQuestion,
    isError: isQuestionError,
  } = useQuestionDetails(id ?? "");

  /* =========================
     GET EXAMS
  ========================= */

  const { data: examsData } = useExams({
    page: 1,
    limit: 100,
  });

  /* =========================
     MUTATIONS
  ========================= */

  const createQuestionMutation = useCreateQuestion();
  const updateQuestionMutation = useUpdateQuestion();
  const createBulkQuestionMutation = useCreateBulkQuestions();

  /* =========================
     EXAMS
  ========================= */

  const exams =
    examsData?.payload?.data?.map((exam) => ({
      id: exam.id,
      title: exam.title,
    })) ?? [];

  /* =========================
     FILL FORM - EDIT
  ========================= */

  useEffect(() => {
    if (!isEditMode || !questionData?.payload?.question) {
      return;
    }

    const question = questionData?.payload?.question;

    singleForm.reset({
      examId: question.examId,
      text: question.text,
      answers: question.answers.map((answer) => ({
        text: answer.text,
        isCorrect: true
      })),
    });
  }, [isEditMode, questionData, singleForm]);

  /* =========================
     SUBMIT (SINGLE)
  ========================= */

  const handleSingleSubmit = (values: QuestionFormValues) => {
    if (isEditMode && id) {
      updateQuestionMutation.mutate(
        { id, values },
        {
          onSuccess: (data) => {
            toast.success("Question updated successfully");
            navigate(`/admin/questions/${data.question.id}`);
          },
          onError: (error) => {
            console.error("UPDATE QUESTION ERROR:", error);
            if (axios.isAxiosError(error) && error.response?.data?.message) {
              toast.error(error.response.data.message);
            } else {
              toast.error("Unable to update question");
            }
          },
        }
      );
      return;
    }

    if (!values.examId) {
      toast.error("Exam ID is missing");
      return;
    }

    createQuestionMutation.mutate(
      { examId: values.examId, values },
      {
        onSuccess: (data) => {
          toast.success("Question created successfully");
          navigate(`/admin/questions/${data.question.id}`);
        },
        onError: (error) => {
          console.error("CREATE QUESTION ERROR:", error);
          if (axios.isAxiosError(error) && error.response?.data?.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Unable to create question");
          }
        },
      }
    );
  };

  /* =========================
     SUBMIT (BULK)
  ========================= */

  const handleBulkSubmit = (values: any) => {
    const { examId } = values;

    if (!examId) {
      toast.error("Exam ID is missing");
      return;
    }

    createBulkQuestionMutation.mutate(
      { examId, values },
      {
        onSuccess: () => {
          toast.success("Questions created successfully");
          navigate(`/admin/exams/${examId}`);
        },
        onError: (error) => {
          console.error("CREATE BULK QUESTION ERROR:", error);
          if (axios.isAxiosError(error) && error.response?.data?.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Unable to create questions");
          }
        },
      }
    );
  };


  /* =========================
     LOADING
  ========================= */

  if (isEditMode && isLoadingQuestion) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-gray-500">Loading question...</p>
      </div>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (isEditMode && isQuestionError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-red-500">Failed to load question.</p>
      </div>
    );
  }

  /* =========================
     SUBMITTING
  ========================= */

  const isSubmitting =
    createQuestionMutation.isPending ||
    updateQuestionMutation.isPending ||
    createBulkQuestionMutation.isPending;

  /* =========================
     UI
  ========================= */

  return (
    <div className="min-h-full w-full bg-white">
      <div className="mx-auto max-w-5xl py-8">
        <div className="bg-white">
          {/* Breadcrumb */}
          <div className="border-b px-6 py-4 text-sm">
            <span className="text-gray-400">Exams</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="font-medium text-blue-600">
              {isEditMode ? "Edit Question" : "Create New Question"}
            </span>
          </div>

          {/* Content */}
          <div className="bg-[#f8fafc] p-6">
            {!isBulkMode ? (
              <QuestionForm
                form={singleForm}
                exams={exams}
                isEditMode={isEditMode}
                isSubmitting={isSubmitting}
                onSubmit={handleSingleSubmit}
                onToggleBulkMode={() => setIsBulkMode(true)}
              />
            ) : (
              <BulkQuestionForm
                // @ts-ignore - The Zod schema extends BulkQuestionsFormValues with examId for validation
                form={bulkForm}
                exams={exams}
                isSubmitting={isSubmitting}
                onSubmit={handleBulkSubmit}
                onToggleBulkMode={() => setIsBulkMode(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}