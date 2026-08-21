import { useMutation } from "@tanstack/react-query";
import { updateExam } from "../api/updateExam";

export default function useUpdateExam() {
  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: {
        title: string;
        description: string;
        image: string;
        duration: number;
        diplomaId: string;
      };
    }) => updateExam(id, values),
  });
}