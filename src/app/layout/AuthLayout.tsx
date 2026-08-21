import Logo from "./components/auth-illustration/Logo";
import Hero from "./components/auth-illustration/Hero";
import AuthIllustration from "./components/auth-illustration/AuthIllustration";
import { Outlet } from "react-router-dom";
import RegistrationStepper from "@/features/auth/components/RegistrationStepper";

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="flex flex-col gap-10 pt-8 bg-gradient-to-br from-blue-200 via-blue-50 to-white">
        <div className="mx-auto">
          <Logo />

          <div className="mt-20">
            <Hero />
          </div>

          <div>
            <AuthIllustration />
          </div>
        </div>
      </div>

<div className="flex flex-col justify-center items-center px-8">
  <div className="w-full max-w-md">
    <RegistrationStepper />
  </div>

  <div className="w-full max-w-md">
    <Outlet />
  </div>
  </div>
    </div>
  );
}