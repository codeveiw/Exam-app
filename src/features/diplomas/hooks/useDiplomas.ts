import { useInfiniteQuery } from "@tanstack/react-query";
import { getDiplomas } from "../api/getDiplomas";

const LIMIT = 9;

export default function useDiplomas() {
  return useInfiniteQuery({
    queryKey: ["diplomas"],
    queryFn: ({ pageParam = 1 }) =>
      getDiplomas({ page: pageParam as number, limit: LIMIT }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.payload.metadata;
      return page < totalPages ? page + 1 : undefined;
    },
  });
}
