import { useMutation } from "@tanstack/react-query";
import { updateDiploma } from "../api/updateDiploma";

export default function useUpdateDiploma() {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        title: string;
        description: string;
        image: string;
      };
    }) => updateDiploma(id, data),
  });
}