import { api } from '@/services/api/axios'
import type { ResetPasswordRequest, ResetPasswordResponse } from '../types/user'


export async function resetPassword(data:ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const response =await api.post<ResetPasswordResponse>('/auth/reset-password', data)
  return response.data
}
