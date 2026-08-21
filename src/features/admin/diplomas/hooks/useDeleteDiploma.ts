import { useMutation } from "@tanstack/react-query";
import { deleteDiploma } from "../api/deleteDiploma";

export default function useDeleteDiploma() {
  return useMutation({
    mutationFn: deleteDiploma,
  });
}