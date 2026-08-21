
import type { ROLE } from "../../auth/types/role";
export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetProfileResponse {
   status: boolean;
  code: number;
  payload: {
    user: User;
  };
}


export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  profilePhoto?: string | null;
  phone: string;
}

export interface UpdateProfileResponse {
  user: User;
}

export interface DeleteAccountResponse {
  message: string;
}


export interface ChangeEmailPayload {
  newEmail: string;
}

export interface ChangeEmailResponse {
  message: string;
  code: string;
}


export interface ConfirmEmailPayload {
  code: string;
}

export interface ConfirmEmailResponse {
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    profilePhoto: string | null;
    emailVerified: boolean;
    phoneVerified: boolean;
  role: typeof ROLE[keyof typeof ROLE];
    createdAt: string;
    updatedAt: string;
  };
}


export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
}