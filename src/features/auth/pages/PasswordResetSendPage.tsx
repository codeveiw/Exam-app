import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export default function ResetPasswordSentPage() {
  const location = useLocation();

  const email = location.state?.email ?? "";

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-20 font-mono">
      {/* Back Button */}
      <Button
        asChild
        variant="outline"
        size="icon"
        className="my-10 h-12 w-12 rounded-none"
      >
        <Link to="/auth/forgot-password">
          <ArrowLeft className="h-5 w-5 " />
        </Link>
      </Button>

     
      <h1 className="text-3xl  font-bold tracking-tight text-gray-800">
        Password Reset Sent
      </h1>

    
      <div className=" font-mono leading-9 font-normal text-base">
        <p className="text-gray-700">
          We have sent a password reset link to:
          <br />
          <span className="break-all text-blue-600">
            {email}
          </span>
          .
        </p>

        <p className="text-slate-700">
          Please check your inbox and follow the
          instructions to reset your password.
        </p>

        <p className="text-gray-500 py-4 ">
          If you don’t see the email within a few minutes,
          check your spam or junk folder.
        </p>
      </div>


      <div className=" font-mono text-lg text-gray-500">
        Don’t have an account?{" "}
        <Link
          to="/auth/register"
          className="font-medium text-blue-600 hover:underline"
        >
          Create yours
        </Link>
      </div>
    </div>
  );
}