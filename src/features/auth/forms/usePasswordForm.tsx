
import { useForm } from 'react-hook-form'
import { passwordSchema, type PasswordSchema } from './schemas/password.schema'
import { zodResolver } from '@hookform/resolvers/zod'

export default function usePassworForm() {
    const form = useForm<PasswordSchema>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        }
    })
  return form
}
