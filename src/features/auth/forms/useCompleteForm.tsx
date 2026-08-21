
import { zodResolver } from '@hookform/resolvers/zod'
import { completeAccountSchema, type CompleteAccountSchema } from './schemas/complete.schema'
import { useForm } from 'react-hook-form'

export default function useCompleteForm() {
    const form = useForm<CompleteAccountSchema>({
        resolver: zodResolver(completeAccountSchema),
        defaultValues:{
            firstName: "",
            lastName: "",
            username: "",
            phone: "",
        }
    })
  return form
}
