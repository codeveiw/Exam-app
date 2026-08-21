import { useQuery } from "@tanstack/react-query";
import { getDiplomaDetails } from "../api/getDiplomaDetails";

export default function useDiplomaDetails(id: string) {
  return useQuery({
    queryKey: ["admin-diploma", id],
    queryFn: () => getDiplomaDetails(id),
    enabled: !!id,
  });
}