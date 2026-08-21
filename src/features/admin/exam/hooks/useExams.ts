import { useQuery } from "@tanstack/react-query";
import { getExams, type GetExamsParams } from "../api/getExam";

export default function useExams(params?: GetExamsParams) {
  return useQuery({
    queryKey: ["admin-exams", params],
    queryFn: () => getExams(params),
  });
}