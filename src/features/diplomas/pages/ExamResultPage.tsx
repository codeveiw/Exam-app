import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CircleHelp,
  RotateCcw,
  FolderOpen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function ExamResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { submission, analytics } = location.state;

  const {
    examTitle,
    totalQuestions,
    correctAnswers,
    wrongAnswers,
  } = submission;

  // النسبة المئوية للنجاح
  const scorePercentage =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  return (
    <div className="space-y-5">

      {/* ================= HEADER ================= */}
      <div className="flex gap-3 items-stretch">

        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/dashboard")}
          className="h-14 w-12 rounded-none border-blue-500 text-blue-600"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="flex flex-1 items-center gap-3 bg-blue-600 px-5 h-14 text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white">
            <CircleHelp className="h-5 w-5" />
          </div>

          <h1 className="text-2xl font-semibold">
            {examTitle} Questions
          </h1>
        </div>

      </div>


      {/* ================= PROGRESS ================= */}
      <Card className="rounded-none border-0 p-5 shadow-none">

        <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
          <span>
            Frontend Development - {examTitle}
          </span>

          <span>
            Question{" "}
            <span className="font-bold text-blue-600">
              {totalQuestions}
            </span>{" "}
            of {totalQuestions}
          </span>
        </div>

        <Progress
          value={100}
          className="h-3 rounded-none bg-blue-50 [&>div]:bg-blue-600"
        />

      </Card>


      {/* ================= RESULTS TITLE ================= */}
      <h2 className="text-xl font-bold text-blue-600">
        Results:
      </h2>


      {/* ================= RESULT CONTENT ================= */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[220px_1fr]">

        {/* ===== LEFT RESULT CARD ===== */}
        <Card className="rounded-none border-blue-200 bg-blue-50 p-5">

          {/* Donut */}
          <div className="flex justify-center py-8">

            <div
              className="relative h-40 w-40 rounded-full"
              style={{
                background: `conic-gradient(
                  #10b981 0% ${scorePercentage}%,
                  #ef4444 ${scorePercentage}% 100%
                )`,
              }}
            >

              {/* inner circle */}
              <div className="absolute inset-5 rounded-full bg-blue-50" />

              {/* percentage */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">
                  {scorePercentage}%
                </span>
              </div>

            </div>

          </div>


          {/* Correct */}
          <div className="flex items-center gap-2 text-sm">
            <span className="h-3 w-3 bg-emerald-500" />

            <span className="font-medium">
              Correct: {correctAnswers}
            </span>
          </div>


          {/* Incorrect */}
          <div className="mt-2 flex items-center gap-2 text-sm">
            <span className="h-3 w-3 bg-red-500" />

            <span className="font-medium">
              Incorrect: {wrongAnswers}
            </span>
          </div>

        </Card>


        {/* ===== QUESTIONS ===== */}
        <Card className="rounded-none border-dashed border-blue-200 p-3">

          <div className="space-y-4">

            {analytics.map((item: any) => (

              <div key={item.questionId}>

                {/* Question */}
                <h3 className="mb-2 text-lg font-bold text-blue-600">
                  {item.questionText}
                </h3>


                {/* Selected answer */}
                <div
                  className={`flex items-center gap-3 px-3 py-3 ${
                    item.isCorrect
                      ? "bg-emerald-50"
                      : "bg-red-50"
                  }`}
                >

                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                      item.isCorrect
                        ? "border-emerald-500"
                        : "border-red-500"
                    }`}
                  >
                    {item.isCorrect ? (
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                    )}
                  </span>

                  <span className="text-sm">
                    {item.selectedAnswer?.text ?? "Not answered"}
                  </span>

                </div>


                {/* Correct answer */}
                {!item.isCorrect && (
                  <div className="mt-2 flex items-center gap-3 bg-emerald-50 px-3 py-3">

                    <span className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-emerald-500">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    </span>

                    <span className="text-sm">
                      {item.correctAnswer?.text}
                    </span>

                  </div>
                )}

              </div>

            ))}

          </div>

        </Card>

      </div>


      {/* ================= ACTIONS ================= */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

        <Button
          variant="secondary"
          className="h-12 rounded-none bg-gray-200 text-gray-700 hover:bg-gray-300"
          onClick={() => navigate(`/dashboard/exams/${submission.examId}`)}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Restart
        </Button>


        <Button
          className="h-12 rounded-none bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate("/dashboard")}
        >
          <FolderOpen className="mr-2 h-4 w-4" />
          Explore
        </Button>

      </div>

    </div>
  );
}