
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from './schemas/login.schema';
import { zodResolver } from "@hookform/resolvers/zod";

export default function useLoginForm() {
    const from = useForm<LoginFormData>({
        resolver:zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        }
    })
  return from
}
