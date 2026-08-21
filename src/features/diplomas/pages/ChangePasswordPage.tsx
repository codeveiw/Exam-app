import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  LogOut,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useChangePassword from "../hooks/useChangePassword";
import useChangePasswordForm from "../forms/useChangePasswordForm";

import type { ChangePasswordFormValues } from "../forms/schema/changePasswordSchema";

interface ApiErrorResponse {
  message?: string;
}

type PasswordField = "currentPassword" | "newPassword" | "confirmPassword";

export default function ChangePasswordPage() {
  const form = useChangePasswordForm();
  const changePasswordMutation = useChangePassword();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<
    Record<PasswordField, boolean>
  >({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePassword = (field: PasswordField) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  const onSubmit: SubmitHandler<ChangePasswordFormValues> = (values) => {
    console.log("CHANGE PASSWORD PAYLOAD:", values);

    changePasswordMutation.mutate(values, {
      onSuccess: (data) => {
        console.log("PASSWORD CHANGED:", data);

        toast.success("Password updated", {
          description:
            data?.message ||
            "Your password has been changed successfully.",
          position: "bottom-right",
          style: {
            background: "black",
            color: "white",
            border: "1px solid black",
          },

        });

        form.reset();
      },

      onError: (error: AxiosError<ApiErrorResponse>) => {
        console.error("CHANGE PASSWORD ERROR:", error);

        toast.error("Something went wrong", {
          description:
            error.response?.data?.message ||
            "Unable to change your password.",
        });
      },
    });
  };

  return (
    <div className="w-full space-y-5">

      <p className="text-xs text-gray-400">Account</p>


      <div className="flex gap-3">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-none border-blue-500 text-blue-600"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="flex h-12 flex-1 items-center gap-3 bg-blue-600 px-4 text-white">
          <UserRound className="h-6 w-6" />

          <h1 className="text-xl font-semibold">
            Account Settings
          </h1>
        </div>
      </div>


      <div className="grid grid-cols-1 gap-4 md:grid-cols-[180px_1fr]">

        <div className="flex min-h-[500px] flex-col bg-white">

          <Link
            to="/dashboard/account"
            className="flex items-center gap-2 px-4 py-3 text-sm text-gray-500 hover:bg-gray-50"
          >
            <UserRound className="h-4 w-4" />

            <span>Profile</span>
          </Link>

          <div className="flex items-center gap-2 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-600">
            <LockKeyhole className="h-4 w-4" />

            <span>Change Password</span>
          </div>


          <div className="mt-auto p-3">
            <Button
              type="button"
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />

              Logout
            </Button>
          </div>
        </div>


        <div className="bg-white px-6 py-6">
          <form
            onSubmit={form.handleSubmit(
              onSubmit,
              (errors) => {
                console.log("FORM ERRORS:", errors);
              }
            )}
            className="space-y-5"
          >

            <div className="space-y-2">
              <label
                htmlFor="currentPassword"
                className="text-sm font-medium"
              >
                Current Password
              </label>

              <div className="relative">
                <Input
                  id="currentPassword"
                  type={
                    showPassword.currentPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="********"
                  className="h-12 rounded-none pr-12"
                  {...form.register("currentPassword")}
                />

                <button
                  type="button"
                  onClick={() =>
                    togglePassword("currentPassword")
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword.currentPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {form.formState.errors.currentPassword && (
                <p className="text-sm text-red-500">
                  {
                    form.formState.errors.currentPassword
                      .message
                  }
                </p>
              )}
            </div>


            <div className="space-y-2">
              <label
                htmlFor="newPassword"
                className="text-sm font-medium"
              >
                New Password
              </label>

              <div className="relative">
                <Input
                  id="newPassword"
                  type={
                    showPassword.newPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="********"
                  className="h-12 rounded-none pr-12"
                  {...form.register("newPassword")}
                />

                <button
                  type="button"
                  onClick={() =>
                    togglePassword("newPassword")
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword.newPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {form.formState.errors.newPassword && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.newPassword.message}
                </p>
              )}
            </div>


            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium"
              >
                Confirm New Password
              </label>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={
                    showPassword.confirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="********"
                  className="h-12 rounded-none pr-12"
                  {...form.register("confirmPassword")}
                />

                <button
                  type="button"
                  onClick={() =>
                    togglePassword("confirmPassword")
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword.confirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {form.formState.errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {
                    form.formState.errors.confirmPassword
                      .message
                  }
                </p>
              )}
            </div>


            {changePasswordMutation.isError && (
              <div className="border border-red-500 bg-red-50 px-4 py-3 text-center text-sm text-red-500">
                {(
                  changePasswordMutation.error as AxiosError<ApiErrorResponse>
                ).response?.data?.message ||
                  "Unable to change your password."}
              </div>
            )}


            <Button
              type="submit"
              disabled={changePasswordMutation.isPending}
              className="h-12 w-full rounded-none bg-blue-600 hover:bg-blue-700"
            >
              {changePasswordMutation.isPending
                ? "Updating..."
                : "Update Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}