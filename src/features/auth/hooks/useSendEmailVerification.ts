import { useMutation } from '@tanstack/react-query'
import sendEmailVerification from '../api/sendEmailVerification'


export default function useSendEmailVerification() {
  return useMutation({
    mutationFn: sendEmailVerification,
    onError: (error) => {
      console.log(error);
    }
  })
}
