import { useForm } from "react-hook-form"
import { emailSchema, type EmailSchema } from "./schemas/email.schema"
import { zodResolver } from "@hookform/resolvers/zod"


export default function useEmailForm() {
    const form = useForm<EmailSchema>({
   resolver: zodResolver(emailSchema),
   defaultValues: {
     email: "",
   },
 })
  return form
}
