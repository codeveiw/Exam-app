import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import useForgetPasswordForm from "../forms/useForgetPasswordForm";
import type { SubmitHandler } from "react-hook-form";
import type { ForgetPasswordSchema } from "../forms/schemas/forgetPassword.schema";
import {useNavigate} from "react-router-dom"
import useForgotPassword from "../hooks/useForgotPassword";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../types/user";


export default function ForgotPasswordPage() {
const navigate = useNavigate();
  const form = useForgetPasswordForm();
  const forgotPasswordMutation = useForgotPassword();
  const onSubmit:SubmitHandler<ForgetPasswordSchema> = (data) => {
    forgotPasswordMutation.mutate(
      {
        email: data.email,
        redirectUrl: `${window.location.origin}/auth/reset-password`,
      },
      {
        onSuccess: () => {
          
          navigate("/auth/reset-send", { state: { email: data.email } });
        },
onError: (error: AxiosError<ApiErrorResponse>) => {
  const errors = error.response?.data?.errors;

  if (errors?.length) {
    errors.forEach((err) => {
      toast.error(err.message);
    });
    return;
  }

  toast.error(
    error.response?.data?.message || "Something went wrong"
  );
}
      }
    );
    console.log(data)
  }

  return (
    <div className="w-full max-w-md ">
      <h1 className="text-3xl font-bold  my-3 text-gray-800">Forgot Password</h1>
      <p className="text-gray-500 font-normal font-mono text-base mb-6">Don’t worry, we will help you recover your account.</p>
      <form action="" className=" flex flex-col gap-5 w-full" onSubmit={form.handleSubmit(onSubmit)}>

        <Field className="">
          <FieldLabel htmlFor="input-field-email" className="text-gray-800 font-medium text-base">Email<span className="text-red-500">*</span></FieldLabel>
          <Input
            id="input-field-email"
            type="email"
            placeholder="Enter your email"
            className={cn(
              "w-full",
              form.formState.errors.email && "border-red-500 focus-visible:ring-red-500"
            )}
            {...form.register('email')}
          />
          <FieldError errors={[form.formState.errors.email]} />
        </Field>
        <div>
          <Button type="submit"  className="w-full font-medium text-sm " >
          Next<span className="ps-3 text-xl">{">"}</span>
          </Button>
        </div>
     

      </form>
    </div>
  )
}
