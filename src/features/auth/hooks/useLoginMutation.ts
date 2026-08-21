import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login";
import { useNavigate } from "react-router-dom";

export function useLoginMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
    
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("USER:", data.user);

      if (data.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    },

    onError: (error) => {
      console.log("LOGIN ERROR:", error);
    },
  });
}