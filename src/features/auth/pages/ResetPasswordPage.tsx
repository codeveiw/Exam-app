import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import useResetPasswordForm from "../forms/useResetPasswordForm";
import type { SubmitHandler } from "react-hook-form";
import type { ResetPasswordSchema } from "../forms/schemas/resetPassword.schema";
import useResetPasswordMutation from "../hooks/useResetPasswordMutation";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


export default function ResetPasswordPage() {
  const form = useResetPasswordForm();
    const [showPassword, setShowPassword] = useState(false);
      const [showError, setShowError] = useState(true);
      const resetPasswordMutation = useResetPasswordMutation();
      const [searchParams] = useSearchParams();
      const navigate = useNavigate();

const token = searchParams.get("token");

    const onSubmit: SubmitHandler<ResetPasswordSchema> = (data) => {
  if (!token) {
    toast.error("Reset token is missing");
    return;
  }

  resetPasswordMutation.mutate(
    {
      token,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    },
    {
      onSuccess: (response) => {
        toast.success(response.message);

        navigate("/auth/login");
      },

      onError: (error: any) => {
        const errors = error.response?.data?.errors;

        if (errors?.length) {
          errors.forEach((err: any) => {
            toast.error(err.message);
          });
          return;
        }

        toast.error(
          error.response?.data?.message ||
            "Something went wrong"
        );
      },
    }
  );
};
  return (
    <div className="w-full max-w-md ">
      <p className="text-3xl font-bold  my-8 text-gray-800">Reset Password</p>
      <form action="" className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <Field className="mt-4">
          <FieldLabel htmlFor="input-field-password" className="text-gray-800 font-medium text-sm">New Password</FieldLabel>
          <div className="relative">
            <Input
              id="input-field-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={cn(
                "w-full",
                form.formState.errors.newPassword &&
                "border-red-500 focus-visible:ring-red-500"
              )}
              {...form.register("newPassword")}
            />

            <FieldError errors={[form.formState.errors.newPassword]} />

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
          <FieldLabel htmlFor="input-field-password" className="text-gray-800 font-medium text-sm">Confirm New Password</FieldLabel>
          <div className="relative">
            <Input
              id="input-field-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={cn(
                "w-full",
                form.formState.errors.confirmPassword &&
                "border-red-500 focus-visible:ring-red-500"
              )}
              {...form.register("confirmPassword")}
            />

            <FieldError errors={[form.formState.errors.confirmPassword]} />

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

        <div>

          {resetPasswordMutation.isError && showError && (
            <div className="relative mt-6 border border-red-500 bg-red-50 px-4 py-3 text-center text-sm text-red-500">

              <button
                type="button"
                onClick={() => setShowError(false)}
                className="absolute left-1/2 top-0 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-red-500 bg-white"
              >
                <X className="h-2.5 w-2.5" />
              </button>

              <p>
                {axios.isAxiosError(resetPasswordMutation.error)
                  ? resetPasswordMutation.error.response?.data?.message
                  : "Something went wrong"}
              </p>

            </div>
          )}
          <Button type="submit" className="w-full bg-blue-600 mt-8 rounded-none">Reset Password</Button>
          <p className="text-gray-500 w-full text-center pt-8 text-sm font-medium">Don’t have an account? <Link to="/auth/register" className="text-blue-600 ">Create yours</Link></p>
        </div>
      </form>
    </div>
  )
}
