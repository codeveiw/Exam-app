import { useForm } from "react-hook-form"
import { forgetPasswordSchema, type ForgetPasswordSchema } from "./schemas/forgetPassword.schema"
import { zodResolver } from "@hookform/resolvers/zod"


export default function useForgetPasswordForm() {
    const form = useForm<ForgetPasswordSchema>({
        resolver:zodResolver(forgetPasswordSchema),
        defaultValues: {
            email: '',
        }
    })
  return form
}
