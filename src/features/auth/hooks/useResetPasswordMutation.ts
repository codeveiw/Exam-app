import { useMutation } from '@tanstack/react-query'

import { resetPassword } from '../api/resetPassword'

export default function useResetPasswordMutation() {
  return useMutation({
    mutationFn:resetPassword,
  })
}
