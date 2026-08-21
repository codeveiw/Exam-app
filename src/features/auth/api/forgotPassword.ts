
import type { ForgotPasswordRequest, ForgotPasswordResponse } from '../types/user'
import { api } from '@/services/api/axios'

export async  function forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
const response =await api.post<ForgotPasswordResponse>('/auth/forgot-password', data)
  return response.data
}
