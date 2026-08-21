import { useInfiniteQuery } from "@tanstack/react-query";
import { getExams } from "../api/getExam";


export default function useExams(diplomaId: string) {
  return useInfiniteQuery({
    queryKey: ["exams", diplomaId],

    queryFn: ({ pageParam }) => {
      return getExams(diplomaId, pageParam);
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.payload.metadata;

      if (page < totalPages) {
        return page + 1;
      }

      return undefined;
    },

    enabled: !!diplomaId,
  });
}