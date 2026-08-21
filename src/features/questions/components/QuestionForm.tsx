import { Trash2 } from "lucide-react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { QuestionFormValues } from "../types/question";

interface QuestionFormProps {
  form: UseFormReturn<QuestionFormValues>;
  exams: {
    id: string;
    title: string;
  }[];
  isEditMode: boolean;
  isSubmitting: boolean;
  onSubmit: (values: QuestionFormValues) => void;
  onToggleBulkMode?: () => void;
}

export default function QuestionForm({
  form,
  exams,
  isEditMode,
  isSubmitting,
  onSubmit,
  onToggleBulkMode,
}: QuestionFormProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "answers",
  });

  const answers = form.watch("answers");

  const handleMarkCorrect = (index: number) => {
    answers.forEach((_, answerIndex) => {
      form.setValue(
        `answers.${answerIndex}.isCorrect`,
        answerIndex === index,
        {
          shouldValidate: true,
        }
      );
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <Button
            type="button"
            variant="secondary"
            className="rounded-none bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center gap-2"
            onClick={onToggleBulkMode}
          >
            <span className="opacity-50">📑</span> Bulk Add Mode
          </Button>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-none bg-gray-100 text-gray-700 border-none hover:bg-gray-200"
              onClick={() => window.history.back()}
            >
              ✕ Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-none bg-[#00d084] hover:bg-[#00b070] text-white px-6"
            >
              {isSubmitting ? "Saving..." : "💾 Save"}
            </Button>
          </div>
        </div>

        {/* Question Information Section */}
        <div className="border bg-white shadow-sm">
          <div className="bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
            Question Information
          </div>
          <div className="p-4 space-y-6">
            {/* Exam */}
            <FormField
              control={form.control}
              name="examId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-gray-700">Exam</FormLabel>

                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isEditMode}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-none text-sm text-gray-500 border-gray-200">
                        <SelectValue placeholder="Select exam" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {exams.map((exam) => (
                        <SelectItem
                          key={exam.id}
                          value={exam.id}
                        >
                          {exam.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Question */}
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-gray-700">Question Headline</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter question headline"
                      className="rounded-none text-sm border-gray-200"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Question Answers Section */}
        <div className="border bg-white shadow-sm">
          <div className="bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
            Question Answers
          </div>

          <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-2">
            <span className="text-xs font-semibold text-gray-500">Body</span>
            <Button
              type="button"
              className="h-8 rounded-none bg-[#00d084] hover:bg-[#00b070] px-3 text-xs shadow-none border-none text-white"
              onClick={() =>
                append({
                  text: "",
                  isCorrect: false,
                })
              }
            >
              + Add Answer
            </Button>
          </div>

          <div className="p-0">
            {/* Rows */}
            {fields.map((field, index) => {
              const isCorrect = answers?.[index]?.isCorrect;
              const isLastRowEmpty = index === fields.length - 1 && !answers?.[index]?.text;

              return (
                <div
                  key={field.id}
                  className="flex items-center gap-4 border-b px-4 py-3 last:border-b-0"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={fields.length <= 2 && !isLastRowEmpty}
                    className="h-6 w-6 shrink-0 rounded-full"
                    onClick={() => {
                      if (isLastRowEmpty) {
                        remove(index);
                      } else {
                        remove(index);
                      }
                    }}
                  >
                    {isLastRowEmpty ? (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-gray-400 font-bold text-xs bg-gray-50">✕</div>
                    ) : (
                      <Trash2 className="h-4 w-4 text-red-400" />
                    )}
                  </Button>


                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name={`answers.${index}.text`}
                      render={({ field }) => (
                        <FormItem className="space-y-0">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={isLastRowEmpty ? "Enter answer body" : "Enter answer"}
                              className={`rounded-none text-sm border-none shadow-none focus-visible:ring-0 px-0  ${isLastRowEmpty ? "text-gray-400 border border-emerald-400 px-3 py-1 ring-1 ring-emerald-400" : ""}`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {!isLastRowEmpty ? (
                    <Button
                      type="button"
                      variant={isCorrect ? "ghost" : "secondary"}
                      className={`h-8 rounded-none px-3 text-xs w-[140px] shadow-none ${isCorrect
                        ? "bg-white text-[#00d084] hover:bg-emerald-50 hover:text-[#00b070]"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      onClick={() => handleMarkCorrect(index)}
                    >
                      {isCorrect ? "✓ Correct Answer" : "✓ Mark Correct"}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className="h-8 rounded-none bg-[#00d084] hover:bg-[#00b070] px-6 text-xs text-white"
                    >
                      + Add
                    </Button>
                  )}
                </div>
              );
            })}

            {fields.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-gray-400">
                No answers added.
              </div>
            )}
          </div>

          {form.formState.errors.answers?.root?.message && (
            <div className="px-4 pb-4">
              <p className="text-sm text-red-500">
                {form.formState.errors.answers.root.message}
              </p>
            </div>
          )}

          {form.formState.errors.answers?.message && (
            <div className="px-4 pb-4">
              <p className="text-sm text-red-500">
                {form.formState.errors.answers.message}
              </p>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}