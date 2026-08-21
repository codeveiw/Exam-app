import { api } from "@/services/api/axios";
import type {  SendEmailVerificationRequest, SendEmailVerificationResponse } from "../types/user";

export type SendEmailVerificationRequestType = SendEmailVerificationRequest
export default async function sendEmailVerification(data :SendEmailVerificationRequest): Promise<SendEmailVerificationResponse> {
    const response =await api.post<SendEmailVerificationResponse>("/auth/send-email-verification",data);
    return response.data ;

}
