import type { ROLE } from "./role";

export interface IUser {
  id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: typeof ROLE[keyof typeof ROLE];
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  user: IUser;
  token: string;
}
export interface LoginApiResponse {
  status: boolean;
  code: number;
  payload: LoginResponse;
}


export interface SendEmailVerificationRequest{
email: string;
}
export interface SendEmailVerificationApiResponse {
  status: boolean;
  code: number;
  message:string;
}
export interface SendEmailVerificationResponse{
  
  message: string;
  code: string;

}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface VerifyEmailResponse {
  status: boolean;
  code: number;
  message: string;
}

export interface RegistrationData {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
};


export interface AuthContextType {
  registrationData: RegistrationData;
  setRegistrationData: React.Dispatch<
    React.SetStateAction<RegistrationData>
  >;
};

export interface CompleteRegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface CompleteRegisterResponse {
  user: IUser;
  token: string;
}

export interface ForgotPasswordRequest {
  email: string;
  redirectUrl: string;
}

export interface ForgotPasswordResponse {
  message: string;
  resetToken: string;
}
export interface ApiErrorResponse {
  message: string;
  errors?: {
    path: string;
    message: string;
  }[];
}

export interface ResetPasswordRequest {
 
  token: string,
  newPassword: string,
  confirmPassword: string

}
export interface ResetPasswordResponse {
  message: string;

}