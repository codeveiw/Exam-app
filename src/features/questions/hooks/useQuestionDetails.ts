import { useQuery } from "@tanstack/react-query";
import {
  getQuestionById,
} from "../api/getQuestionById";

export default function useQuestionDetails(id: string) {
  return useQuery({
    queryKey: ["question", id],
    queryFn: () => getQuestionById(id),
    enabled: !!id,
  });
}