import { useQuery } from "@tanstack/react-query";
import { getExamId } from "../api/getExamId";

export default function useExamId(id: string) {
  return useQuery({
    queryKey: ["exam", id],
    queryFn: () => getExamId(id),
    enabled: !!id,
  });
}