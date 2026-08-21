import { useForm } from "react-hook-form"
import { verifyEmailSchema, type VerifyEmailFormData } from "./schemas/verifyEmail.schema"
import { zodResolver } from "@hookform/resolvers/zod"


export default function useVerifyEmailForm() {
    const form =useForm<VerifyEmailFormData>({
        resolver: zodResolver(verifyEmailSchema),
        defaultValues: {
            otp: '',
        }
    })
  return form
}
