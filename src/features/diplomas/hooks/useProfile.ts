import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/accountApi";

export default function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
  });
}