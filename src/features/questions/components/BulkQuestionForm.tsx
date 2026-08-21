import { useState } from "react";
import { Trash2, Plus, X } from "lucide-react";
import { useFieldArray, type UseFormReturn, useWatch } from "react-hook-form";

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

import type { BulkQuestionsFormValues } from "../types/question";

interface BulkQuestionFormProps {
    form: UseFormReturn<BulkQuestionsFormValues>;
    exams: {
        id: string;
        title: string;
    }[];
    isSubmitting: boolean;
    onSubmit: (values: BulkQuestionsFormValues) => void;
    onToggleBulkMode: () => void;
}

export default function BulkQuestionForm({
    form,
    exams,
    isSubmitting,
    onSubmit,
    onToggleBulkMode,
}: BulkQuestionFormProps) {
    const [activeTab, setActiveTab] = useState(0);

    const {
        fields: questionFields,
        append: appendQuestion,
        remove: removeQuestion,
    } = useFieldArray({
        control: form.control,
        name: "questions",
    });

    const handleAddQuestion = () => {
        appendQuestion({
            text: "",
            answers: [
                { text: "", isCorrect: true },
                { text: "", isCorrect: false },
            ],
        });
        setActiveTab(questionFields.length);
    };

    const handleRemoveQuestion = (index: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (questionFields.length === 1) return; // keep at least 1
        removeQuestion(index);
        if (activeTab >= index && activeTab > 0) {
            setActiveTab(activeTab - 1);
        }
    };

    // Sub-component for managing the Answers of the actively selected question tab
    const QuestionAnswers = ({ questionIndex }: { questionIndex: number }) => {
        const { fields: answerFields, append: appendAnswer, remove: removeAnswer } = useFieldArray({
            control: form.control,
            name: `questions.${questionIndex}.answers`,
        });

        const answers = useWatch({
            control: form.control,
            name: `questions.${questionIndex}.answers`,
        });

        const handleMarkCorrect = (answerIdx: number) => {
            answers.forEach((_, currentIdx) => {
                form.setValue(
                    `questions.${questionIndex}.answers.${currentIdx}.isCorrect`,
                    currentIdx === answerIdx,
                    { shouldValidate: true }
                );
            });
        };

        return (
            <>
                <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-2 mt-6">
                    <span className="text-xs font-semibold text-gray-500">Body</span>
                    <Button
                        type="button"
                        className="h-8 rounded-none bg-[#00d084] hover:bg-[#00b070] px-3 text-xs shadow-none border-none text-white"
                        onClick={() =>
                            appendAnswer({
                                text: "",
                                isCorrect: false,
                            })
                        }
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Answer
                    </Button>
                </div>

                <div className="p-0 border border-t-0 bg-white">
                    {answerFields.map((field, answerIdx) => {
                        const isCorrect = answers?.[answerIdx]?.isCorrect;
                        const isLastRowEmpty = answerIdx === answerFields.length - 1 && !answers?.[answerIdx]?.text;

                        return (
                            <div
                                key={field.id}
                                className="flex items-center gap-4 border-b px-4 py-3 last:border-b-0"
                            >
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    disabled={answerFields.length <= 2 && !isLastRowEmpty}
                                    className="h-6 w-6 shrink-0 rounded-full"
                                    onClick={() => removeAnswer(answerIdx)}
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
                                        name={`questions.${questionIndex}.answers.${answerIdx}.text`}
                                        render={({ field }) => (
                                            <FormItem className="space-y-0">
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder={isLastRowEmpty ? "Enter answer body" : "Enter answer"}
                                                        className={`rounded-none text-sm border-none shadow-none focus-visible:ring-0 px-0 ${isLastRowEmpty ? "text-gray-400 border border-emerald-400 px-3 py-1 ring-1 ring-emerald-400 focus-visible:px-3 focus-visible:py-1" : ""
                                                            }`}
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
                                        onClick={() => handleMarkCorrect(answerIdx)}
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

                    {form.formState.errors.questions?.[questionIndex]?.answers?.root?.message && (
                        <div className="px-4 pb-4 mt-2">
                            <p className="text-sm text-red-500">
                                {form.formState.errors.questions[questionIndex]?.answers?.root?.message}
                            </p>
                        </div>
                    )}

                    {form.formState.errors.questions?.[questionIndex]?.answers?.message && (
                        <div className="px-4 pb-4 mt-2">
                            <p className="text-sm text-red-500">
                                {form.formState.errors.questions[questionIndex]?.answers?.message}
                            </p>
                        </div>
                    )}
                </div>
            </>
        );
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-6">
                    <Button
                        type="button"
                        className="rounded-none bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                        onClick={onToggleBulkMode}
                    >
                        <span className="opacity-80">📑</span> Bulk Add Mode
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

                {/* Exam Info Section */}
                <div className="bg-white shadow-sm border border-x-0 border-t-0 border-b-0 pb-6">
                    <div className="bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                        Exam Info
                    </div>
                    <div className="p-4 border border-t-0 space-y-6">
                        <FormField
                            control={form.control}
                            name="examId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-semibold text-gray-700">Exam</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className="rounded-none text-sm text-gray-500 border-gray-200">
                                                <SelectValue placeholder="Select exam" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {exams.map((exam) => (
                                                <SelectItem key={exam.id} value={exam.id}>
                                                    {exam.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Questions Section - Bulk Formatting */}
                <div className="bg-white shadow-sm">
                    <div className="bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                        Questions
                    </div>

                    {/* Tabs header */}
                    <div className="flex flex-wrap border-b border-l border-r bg-white text-xs font-medium text-gray-600 select-none">
                        {questionFields.map((q, idx) => {
                            const isActive = activeTab === idx;
                            return (
                                <div
                                    key={q.id}
                                    onClick={() => setActiveTab(idx)}
                                    className={`flex items-center px-6 py-3 cursor-pointer border-r last:border-r-0 transition-colors ${isActive
                                            ? "text-blue-600 border-b-2 border-b-blue-600 -mb-[1px] bg-blue-50/20"
                                            : "hover:bg-gray-50"
                                        }`}
                                >
                                    <span className="font-semibold">Q{idx + 1}</span>
                                    {questionFields.length > 1 && (
                                        <X
                                            className={`ml-2 h-3.5 w-3.5 hover:bg-gray-200 rounded p-[1px] ${isActive ? "text-red-500" : "text-gray-400"}`}
                                            onClick={(e) => handleRemoveQuestion(idx, e)}
                                        />
                                    )}
                                </div>
                            );
                        })}

                        <div
                            onClick={handleAddQuestion}
                            className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 border-r last:border-r-0 transition-colors text-gray-500"
                        >
                            <Plus className="h-4 w-4" />
                        </div>

                        <div className="flex-1" />
                    </div>

                    {/* Active Tab Body */}
                    <div className="p-4 border border-t-0 space-y-6">
                        <FormField
                            control={form.control}
                            name={`questions.${activeTab}.text`}
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

                        <QuestionAnswers questionIndex={activeTab} />
                    </div>
                </div>
            </form>
        </Form>
    );
}
