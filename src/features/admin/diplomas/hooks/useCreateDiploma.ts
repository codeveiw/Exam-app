import { useMutation } from "@tanstack/react-query";
import {
  createDiploma,

} from "../api/createDiploma";
import type { CreateDiplomaPayload } from "../types/diploma";

export default function useCreateDiploma() {
  return useMutation({
    mutationFn: (values: CreateDiplomaPayload) =>
      createDiploma(values),
  });
}