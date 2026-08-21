import { api } from "@/services/api/axios";
import type { CompleteRegisterRequest, CompleteRegisterResponse } from "../types/user";


export async  function completeRegister(data: CompleteRegisterRequest): Promise<CompleteRegisterResponse> {
const response =await api.post<CompleteRegisterResponse>("/auth/register", data);
return response.data;

}
