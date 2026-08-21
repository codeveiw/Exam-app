import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "../api/verifyEmail";
import { useNavigate } from "react-router-dom";

export default function useVerifyEmail() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: verifyEmail,

    onSuccess: (data) => {
      console.log("VERIFY SUCCESS:", data);
      navigate("/auth/complete-account")
    },

 onError: (error: any) => {
  console.log("VERIFY ERROR DATA:", error.response?.data);
  console.log("VERIFY ERROR STATUS:", error.response?.status);
    
 
}
  });
}