import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import EgyptFlag from "@/assets/icons/EG.svg";
import { ChevronDown, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuthContext from "../hooks/useAuthContext";
import useCompleteForm from "../forms/useCompleteForm";
import type { SubmitHandler } from "react-hook-form";
import type { CompleteAccountSchema } from "../forms/schemas/complete.schema";
import { useNavigate } from "react-router-dom";



export default function CompleteAccountPage() {
  const { setRegistrationData } = useAuthContext()
  const navigate = useNavigate();
  const form = useCompleteForm()
  const onSubmit: SubmitHandler<CompleteAccountSchema> = (data) => {
    setRegistrationData((prev) => ({
      ...prev,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      phone: data.phone,
    }))
    navigate("/auth/create-password")
    console.log(data)
  }

  return (
    <div className="w-full max-w-md mt-10">
      <div className="mt-15">       <h1 className="text-3xl font-bold">
        Create Account
      </h1>
        <h2 className=" text-2xl mt-2 font-bold text-blue-600">
          Tell us more about you
        </h2></div>
      <form action="" onSubmit={form.handleSubmit(onSubmit)} className="">
        <Field className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <FieldLabel className="py-2">First Name<span className="text-red-500">*</span></FieldLabel>

            <Input placeholder="Ahmed" {...form.register("firstName")} />
            <FieldError errors={[form.formState.errors.firstName]} />
          </div>
          <div>
            <FieldLabel className="py-2">Last Name<span className="text-red-500">*</span></FieldLabel>
            <Input placeholder="Ali" {...form.register("lastName")} />
            <FieldError errors={[form.formState.errors.lastName]} />
          </div>
        </Field>
        <Field className="mt-2">
          <FieldLabel>Username<span className="text-red-500">*</span></FieldLabel>
          <Input placeholder="ahmedali" {...form.register("username")} />
          <FieldError errors={[form.formState.errors.username]} />
        </Field>



        <Field className="mt-2">
          <FieldLabel>Phone<span className="text-red-500">*</span></FieldLabel>

          <div className="flex  w-full items-center rounded-md border border-input bg-white">

            <button
              type="button"
              className="flex items-center gap-2 px-3"
            >
              <img
                src={EgyptFlag}
                alt="Egypt"
                className=" w-6 object-cover"
              />

              <span className="text-sm font-medium">
                EG(+20)
              </span>

              <ChevronDown className=" w-4 text-gray-500" />
            </button>


            <ChevronsUpDown className=" w-4 text-black" />

            <Input
              type="tel"
              placeholder="1012345678"
              className="border-0 shadow-none focus-visible:ring-0 focus-visible:outline-none"
              {...form.register("phone")}
            />
          </div>
          <FieldError errors={[form.formState.errors.phone]} />
        </Field>
        <Button type="submit" variant="outline" className="w-full font-medium my-10" >
          Next <span className="ps-3 text-xl">{">"}</span>
        </Button>
      </form>

    </div>
  )
}
