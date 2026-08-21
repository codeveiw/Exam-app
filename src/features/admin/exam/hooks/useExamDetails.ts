import { useQuery } from "@tanstack/react-query"
import { getExamDetails } from "../api/getExamDetails";
export default function useExam(id: string) {
  return useQuery({
    queryKey: ["exam", id],
    queryFn: () => getExamDetails(id),
    enabled: !!id,
  });
}