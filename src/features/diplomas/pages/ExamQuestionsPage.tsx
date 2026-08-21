import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, CircleHelp } from "lucide-react";

import useExamId from "../hooks/useExamId";
import useQuestions from "../hooks/useQuestions";
import useSubmitExam from "../hooks/useSubmitExam";

// Helper component for the circular timer
function CircularTimer({ durationInMinutes }: { durationInMinutes: number }) {
  const [timeLeft, setTimeLeft] = useState(durationInMinutes * 60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  const radius = 20;
  const strokeDasharray = 2 * Math.PI * radius;
  const strokeDashoffset = strokeDasharray * (1 - timeLeft / (durationInMinutes * 60));

  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="24" cy="24" r={radius} stroke="#eff6ff" strokeWidth="5" fill="none" />
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="#2563eb"
          strokeWidth="5"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <span className="absolute text-xs font-bold text-gray-700">
        {minutes}:{seconds}
      </span>
    </div>
  );
}

export default function ExamQuestionsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate: submitExam } = useSubmitExam();
  const [startedAt] = useState(() => new Date().toISOString());

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
console.log(selectedAnswers);

  const {
    data: examData,
    isLoading: examLoading,
    isError: examError,
  } = useExamId(id!);

  // Fetch exam questions
  const {
    data: questionsData,
    isLoading: questionsLoading,
    isError: questionsError,
  } = useQuestions(id!);

  if (examLoading || questionsLoading) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (examError || questionsError) {
    return (
      <div className="h-full flex items-center justify-center text-red-500">
        Failed to load exam
      </div>
    );
  }

  const exam = examData?.payload.exam;
  const questions = questionsData?.payload.questions ?? [];
  const question = questions[currentQuestionIdx];

 const handleNext = () => {
  const isLastQuestion =
    currentQuestionIdx === questions.length - 1;


  if (!isLastQuestion) {
    setCurrentQuestionIdx((prev) => prev + 1);
    return;
  }

  const answers = Object.entries(selectedAnswers).map(
    ([questionId, answerId]) => ({
      questionId,
      answerId,
    })
  );

  const payload = {
    examId: id!,
    answers,
    startedAt,
  };

submitExam(payload, {
  onSuccess: (response) => {
    console.log("SUBMISSION RESPONSE:", response);

    navigate(`/dashboard/exams/${id}/result`, {
      state: response.payload,
    });
  },

  onError: (error) => {
    console.error("SUBMIT EXAM ERROR:", error);
  },
});
};

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((prev) => prev - 1);
    }
  };

  const handleSelectAnswer = (answerId: string) => {
    if (question) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [question.id]: answerId,
      }));
    }
  };

  return (
    <div className="h-full bg-white">
      <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col gap-4">

        {/* Breadcrumb */}
        <div className="text-xs text-brand-blue/50 text-gray-400 font-medium">
          Diplomas / {exam?.diploma?.title} / <span className="text-blue-500">{exam?.title}</span>
        </div>

        {/* Header */}
        <div className="flex gap-4 items-stretch">
          <Link
            to={`/diplomas`}
            className="flex items-center justify-center w-12 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1 flex items-center gap-3 bg-blue-600 text-white p-3 rounded-md shadow-sm">
            <CircleHelp className="w-6 h-6 opacity-90" />
            <h1 className="text-xl justify-self-center font-semibold tracking-wide">
              {exam?.title}
            </h1>
          </div>
        </div>

        {/* Progress & Content Wrapper */}
        <div className="bg-white flex flex-col gap-5 rounded-lg mt-1">

          {/* Progress Area */}
          <div className="flex items-center gap-6">
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm font-semibold text-gray-500">
                <span>
                  {exam?.diploma?.title} - {exam?.title}
                </span>
                <span>
                  Question <span className="text-blue-600 font-bold">{currentQuestionIdx + 1}</span> of{" "}
                  {questions.length}
                </span>
              </div>
              <div className="h-2.5 w-full bg-blue-50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
                  style={{
                    width: `${((currentQuestionIdx + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Timer */}
            {exam?.duration && (
              <div className="shrink-0 flex items-center justify-center">
                <CircularTimer durationInMinutes={exam.duration} />
              </div>
            )}
          </div>

          {/* Question Text */}
          <div className="mt-1">
            <h2 className="text-2xl font-bold text-blue-600 mb-5 tracking-tight">
              {question?.text}
            </h2>

            {/* Answers */}
            <div className="flex flex-col gap-3">
              {question?.answers.map((answer) => {
                const isSelected = selectedAnswers[question.id] === answer.id;

                return (
                  <label
                    key={answer.id}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-md border cursor-pointer transition-all ${isSelected
                      ? "border-blue-200 bg-blue-50/40"
                      : "border-transparent bg-gray-50 hover:bg-gray-100"
                      }`}
                  >
                    <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={answer.id}
                        checked={isSelected}
                        onChange={() => handleSelectAnswer(answer.id)}
                        className="peer appearance-none w-4 h-4 border border-gray-300 rounded-full checked:border-blue-600 transition-colors cursor-pointer"
                      />
                      <div className="absolute w-2 h-2 bg-blue-600 rounded-full scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
                    </div>
                    <span className="text-gray-700 text-base font-medium">
                      {answer.text}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-4 mt-2">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIdx === 0}
              className={`flex-1 py-3 font-semibold rounded-md flex items-center justify-center gap-2 transition-colors ${currentQuestionIdx === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              <ChevronLeft className="w-5 h-5" /> Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedAnswers[question.id]}
              className={`flex-1 py-3 font-semibold rounded-md flex items-center justify-center gap-2 transition-colors ${currentQuestionIdx === questions.length - 1
                ? "bg-blue-600 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              Next <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}