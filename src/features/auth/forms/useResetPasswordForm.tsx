
import { resetPasswordSchema, type ResetPasswordSchema } from './schemas/resetPassword.schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export default function useResetPasswordForm() {
    const form = useForm<ResetPasswordSchema>({
        resolver:zodResolver(resetPasswordSchema),
        defaultValues: {  
            newPassword: '',    
            confirmPassword: '',
         }
    }) 
  return form
}
