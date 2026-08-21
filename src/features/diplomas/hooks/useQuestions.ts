import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../api/getQuestions";

export default function useQuestions(examId: string) {
  return useQuery({
    queryKey: ["questions", examId],
    queryFn: () => getQuestions(examId),
    enabled: !!examId,
  });
}