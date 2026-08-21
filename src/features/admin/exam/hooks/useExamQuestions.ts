import { useQuery } from "@tanstack/react-query";
import {
  getExamQuestions,
} from "../api/getExamQuestions";
import type { GetExamQuestionsParams } from "../types/questions";

export default function useExamQuestions(
  examId: string,
  params?: GetExamQuestionsParams
) {
  return useQuery({
    queryKey: ["exam-questions", examId, params],

    queryFn: () => getExamQuestions(examId, params),

    enabled: !!examId,
  });
}