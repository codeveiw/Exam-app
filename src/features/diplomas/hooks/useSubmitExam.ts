import { useMutation } from "@tanstack/react-query";
import { submitExam } from "../api/submitExam";

export default function useSubmitExam() {
  return useMutation({
    mutationFn: submitExam,
  });
}