import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../api/uploadImage";

export default function useUploadImage() {
  return useMutation({
    mutationFn: uploadImage,
  });
}