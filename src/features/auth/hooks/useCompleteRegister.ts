import { useMutation } from '@tanstack/react-query'

import { completeRegister } from '../api/completeRegister'

export default function useCompleteRegister() {
  return useMutation({
    mutationFn:completeRegister,
    
  })
  
}
