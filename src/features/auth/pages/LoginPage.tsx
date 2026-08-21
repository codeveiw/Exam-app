import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError
} from "../../../components/ui/field"
import { X } from "lucide-react";

import { Input } from "../../../components/ui/input"

import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import useLoginForm from "../forms/useLoginForm";
import type { LoginFormData } from "../forms/schemas/login.schema";
import type { SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "../hooks/useLoginMutation";
import axios from "axios";
import { useEffect, useState } from "react";

function LoginPage() {
  const form = useLoginForm();
  const loginMutation = useLoginMutation();
  const [showError, setShowError] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (loginMutation.isError) {
      setShowError(true);
    }
  }, [loginMutation.isError]);
  const onSubmit: SubmitHandler<LoginFormData> = (data) => {

    loginMutation.mutate(data, {
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data?.message);
        }
      },
    });
  }
  return (
    <div className="w-full max-w-md ">
      <p className="text-3xl font-bold  my-8 text-gray-800">Login</p>
      <form action="" className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <Field className="">
          <FieldLabel htmlFor="input-field-username" className="text-gray-800 font-medium text-sm">Username</FieldLabel>
          <Input
            id="input-field-username"
            type="text"
            placeholder="Enter your username"
            className={cn(
              "w-full",
              form.formState.errors.username && "border-red-500 focus-visible:ring-red-500"
            )}
            {...form.register('username')}
          />
          <FieldError errors={[form.formState.errors.username]} />
        </Field>
        <Field className="mt-4">
          <FieldLabel htmlFor="input-field-password" className="text-gray-800 font-medium text-sm">Password</FieldLabel>
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

            <FieldError errors={[form.formState.errors.password]} />

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
        <FieldDescription className="text-right mt-3 no-underline hover:no-underline decoration-transparent  hover:text-blue-800"><Link to="/auth/forgot-password" className="text-blue-600 no-underline hover:no-underline hover:!text-blue-800">Forgot your password?</Link></FieldDescription>
        <div>

          {loginMutation.isError && showError && (
            <div className="relative mt-6 border border-red-500 bg-red-50 px-4 py-3 text-center text-sm text-red-500">

              <button
                type="button"
                onClick={() => setShowError(false)}
                className="absolute left-1/2 top-0 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-red-500 bg-white"
              >
                <X className="h-2.5 w-2.5" />
              </button>

              <p>
                {axios.isAxiosError(loginMutation.error)
                  ? loginMutation.error.response?.data?.message
                  : "Something went wrong"}
              </p>

            </div>
          )}
          <Button type="submit" className="w-full bg-blue-600 mt-8 rounded-none">Login</Button>
          <p className="text-gray-500 w-full text-center pt-8 text-sm font-medium">Don’t have an account? <Link to="/auth/register" className="text-blue-600 ">Create yours</Link></p>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
