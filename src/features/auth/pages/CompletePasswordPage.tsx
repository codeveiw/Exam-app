import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import usePassworForm from "../forms/usePasswordForm";
import { Button } from "@/components/ui/button";
import type { SubmitHandler } from "react-hook-form";
import type { PasswordSchema } from "../forms/schemas/password.schema";
import useAuthContext from "../hooks/useAuthContext";
import useCompleteRegister from "../hooks/useCompleteRegister";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


export default function CompletePasswordPage() {
    const form = usePassworForm();
    const navigate = useNavigate();
    const {registrationData}=useAuthContext()
  const registerMutation = useCompleteRegister();
      const [showPassword, setShowPassword] = useState(false);
      const onSubmit:SubmitHandler<PasswordSchema> = (data) => {
        console.log(data);
   registerMutation.mutate(
    {
      ...registrationData,

      password: data.password,
      confirmPassword: data.confirmPassword,
    },
    {
      onSuccess: (response) => {
     

        localStorage.setItem(
          "token",
          response.token
        );

        navigate("/dashboard");
      },

      onError: (error: any) => {
       
  const errors = error.response?.data?.errors;

  if (errors?.length) {
    errors.forEach((err: any) => {
      toast.error(err.message);
    });

    return;
  }

  toast.error(error.response?.data?.message || "Something went wrong");
      },
    }
  );
      }
  return (
    <div className="mt-10">
               <h1 className="text-3xl font-bold ">
    Create Account
  </h1>
    <h2 className="mt-5 text-2xl font-bold text-blue-600">
   Create a strong password
  </h2>
      <form action="" onSubmit={form.handleSubmit(onSubmit)}>
             <Field className="mt-4">
          <FieldLabel htmlFor="input-field-password" className="text-gray-800 font-medium text-base">Password<span className="text-red-500">*</span></FieldLabel>
          <div className="relative">
            <Input
              id="input-field-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={cn(
                "w-full",
                form.formState.errors.password &&
                "border-red-500 focus-visible:ring-red-500"
              )}
              {...form.register("password")}
            />

            <FieldError     errors={
      form.formState.errors.password
        ? [form.formState.errors.password]
        : []
    } />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
          </div>
        </Field>
             <Field className="mt-4">
          <FieldLabel htmlFor="input-field-confirmPassword" className="text-gray-800 font-medium text-base">Confirm Password<span className="text-red-500">*</span></FieldLabel>
          <div className="relative">
            <Input
              id="input-field-confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your confirm password"
              className={cn(
                "w-full",
                form.formState.errors.confirmPassword &&
                "border-red-500 focus-visible:ring-red-500"
              )}
              {...form.register("confirmPassword")}
            />

            <FieldError     errors={
      form.formState.errors.confirmPassword
        ? [form.formState.errors.confirmPassword]
        : []
    } />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
          </div>
        </Field>
        <Button className="w-full my-12 h-30" type="submit"> {registerMutation.isPending ? "Completing..." : "Complete Password"}</Button>
      </form>
    </div>
  )
}
