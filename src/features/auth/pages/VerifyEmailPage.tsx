import { cn } from "@/lib/utils";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../../components/ui/input-otp";
import { Link, useLocation } from "react-router-dom";
import useVerifyEmail from "../hooks/useVerifyEmail";
import useVerifyEmailForm from "../forms/useVerifyEmailForm";
import { Field, FieldError } from "@/components/ui/field";
import { Controller, type SubmitHandler } from "react-hook-form";
import type { VerifyEmailFormData } from "../forms/schemas/verifyEmail.schema";
import { Button } from "@/components/ui/button";
import useAuthContext from "../hooks/useAuthContext";

export default function VerifyEmailPage() {
   const form = useVerifyEmailForm();
  const verifyEmailMutation = useVerifyEmail();
  const {setRegistrationData} = useAuthContext();

  const location = useLocation();
  const email = location.state?.email;

  const onSubmit: SubmitHandler<VerifyEmailFormData> = (data) => {
    console.log("OTP:", data.otp);
    console.log("Email:", email);

  verifyEmailMutation.mutate(
    {
      email,
      code: data.otp,
    },
    {
      onSuccess: () => {
        setRegistrationData((prev) => ({
          ...prev,
          email,
        }));
      },

    
      onError: (error: any) => {
        form.setError("otp", {
          type: "server",
          message: error.response?.data?.message,
        });
      },
    }
  );
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-gray-900">
        Create Account
      </h1>

      <h2 className="mt-5 text-2xl font-bold text-blue-600">
        Verify OTP
      </h2>

      <p className="mt-3 font-mono text-gray-500">
        Please enter the 6-digit code we have sent to:
      </p>

      <div className="font-mono text-gray-800">
        {email}

        <Link
          to="/auth/register"
          className="ml-2 text-blue-600 underline hover:text-blue-700"
        >
          Edit
        </Link>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-8 flex justify-center">
          <Controller
            control={form.control}
            name="otp"
            render={({ field, fieldState }) => (
              <Field>
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                  className={cn(
                    fieldState.error && "border-red-500"
                  )}
                >
                  <InputOTPGroup className="gap-4">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                <FieldError
                  errors={
                    fieldState.error
                      ? [fieldState.error]
                      : []
                  }
                />
              </Field>
            )}
          />
        </div>

        <p className="mt-6 text-center font-mono text-sm text-gray-500">
          You can request another code in: 60s
        </p>

        <Button
        variant="outline"
          type="submit"
          disabled={verifyEmailMutation.isPending}
          className="mt-12 h-12 w-full   bg-blue-50 font-mono  hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {verifyEmailMutation.isPending ? "Verifying..." : "Verify Code"}
        </Button>
      </form>
    </div>
  );
}