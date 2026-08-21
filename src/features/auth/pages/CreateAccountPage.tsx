import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import useEmailForm from "../forms/useEmailForm";
import { Button } from "@/components/ui/button";

import type { EmailSchema } from "../forms/schemas/email.schema";
import { Link, useNavigate } from "react-router-dom";
import type { SubmitHandler } from "react-hook-form";
import useSendEmailVerification from "../hooks/useSendEmailVerification";

import useAuthContext from "../hooks/useAuthContext";




export default function CreateAccountPage() {
  const form = useEmailForm();

  const { setRegistrationData } = useAuthContext();

  const sendEmailMutation = useSendEmailVerification();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<EmailSchema> = (data) => {
    sendEmailMutation.mutate(data, {

      onSuccess: () => {
        setRegistrationData((prevData) => ({
          ...prevData,
          email: data.email,
        }));
        navigate("/auth/verify-email", {
          state: {
            email: data.email,
          },
        });
      },
    });
  };
  return (
    <div className="w-full max-w-md ">
      <p className="text-3xl font-bold  my-8 text-gray-800">Create Account</p>
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
          <Button type="submit" variant="outline" className="w-full font-medium text-sm " disabled={sendEmailMutation.isPending}>
            {sendEmailMutation.isPending ? "Sending..." : "Next"} <span className="ps-3 text-xl">{">"}</span>
          </Button>
        </div>
        <p className="text-gray-500 w-full text-center pt-8 text-sm font-medium">Already have an account?<Link to="/auth/login" className="text-blue-600 ps-2 ">Login</Link></p>


      </form>
    </div>
  )
}
