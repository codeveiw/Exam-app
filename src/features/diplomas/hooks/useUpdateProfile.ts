import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../api/updateProfile";


export default function useUpdateProfile() {
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      console.log("UPDATE SUCCESS:", data);
    },

    onError: (error) => {
      console.log("UPDATE ERROR:", error);
    },
  })    
 
}