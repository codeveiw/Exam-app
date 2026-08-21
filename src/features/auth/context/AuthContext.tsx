import { createContext, useState } from "react";
import type { AuthContextType, RegistrationData } from "../types/user";

export const AuthContext = createContext<AuthContextType | null>(null);     
export default function AuthContextProvider({ children }: { children: React.ReactNode}) {
    const [registrationData, setRegistrationData] =
  useState<RegistrationData>({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  return <AuthContext.Provider value={{ registrationData, setRegistrationData }}>
    {children}
  </AuthContext.Provider>
}
