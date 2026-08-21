import {
  ArrowLeft,
  ChevronDown,
  ChevronsUpDown,
  Pencil,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import EgyptFlag from "@/assets/icons/EG.svg";

import useProfile from "../hooks/useProfile";
import useUpdateProfile from "../hooks/useUpdateProfile";
import useDeleteAccount from "../hooks/useDeleteAccount";

import ChangeEmailDialog from "../component/ChangeEmailDialog";
import VerifyEmailDialog from "../component/VerifyEmailDialog";
import { Link, useNavigate } from "react-router-dom";

import {
  profileSchema,
  type ProfileFormValues,
} from "../forms/schema/profileSchema";
import { useToast } from "@/hooks/use-toast";
import DeleteAccountDialog from "../component/DeleteAccountDialog";

type ChangeEmailStep = "closed" | "email" | "otp" | "success";

export default function AccountSettingsPage() {
  const { data } = useProfile();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const updateProfileMutation = useUpdateProfile();
  const deleteAccountMutation = useDeleteAccount();

  const [changeEmailStep, setChangeEmailStep] =
    useState<ChangeEmailStep>("closed");

  const rawData = data as any;
  const user = rawData?.payload?.user || (rawData?.payload?.id ? rawData?.payload : null) || rawData?.user || (rawData?.id ? rawData : null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      phone: "",
    },
  });


  useEffect(() => {
    if (!user) return;

    form.reset({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      phone: user.phone,
    });
  }, [user, form]);

  const onSubmit: SubmitHandler<ProfileFormValues> = (values) => {
    console.log("SUBMIT FIRED:", values);

    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
    };

    console.log("PAYLOAD:", payload);

    updateProfileMutation.mutate(payload, {
      onSuccess: () => {
        console.log("Profile updated successfully");

        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        });
      },

      onError: (error) => {
        console.error("Failed to update profile:", error);

        toast({
          title: "Update failed",
          description: "Something went wrong while updating your profile.",
          variant: "destructive",
        });
      },
    });
  };
  const handleDeleteAccount = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login");
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

          <h1 className="text-xl font-semibold">Account Settings</h1>
        </div>
      </div>


      <div className="grid grid-cols-1 gap-4 md:grid-cols-[180px_1fr]">

        <div className="flex min-h-[500px] flex-col bg-white">
          <button className="flex items-center gap-2 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-600">
            <UserRound className="h-4 w-4" />
            Profile
          </button>

          <button className="flex items-center gap-2 px-4 py-3 text-sm text-gray-500 hover:bg-gray-50">
            <Link to="/dashboard/change-password"> Change Password</Link>
          </button>

          <div className="mt-auto p-3">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600"
            >
              Logout
            </Button>
          </div>
        </div>


        <div className="bg-white px-4 py-4">
          <form onSubmit={form.handleSubmit(
            onSubmit,
            (errors) => {
              console.log("FORM ERRORS:", errors);
            }
          )}>

            <Field className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FieldLabel className="py-1">First Name</FieldLabel>

                <Input
                  type="text"
                  placeholder="Ahmed"
                  {...form.register("firstName")}
                />

                <FieldError
                  errors={[form.formState.errors.firstName]}
                />
              </div>

              <div>
                <FieldLabel className="py-1">Last Name</FieldLabel>

                <Input
                  type="text"
                  placeholder="Ali"
                  {...form.register("lastName")}
                />

                <FieldError
                  errors={[form.formState.errors.lastName]}
                />
              </div>
            </Field>


            <Field className="mt-2">
              <FieldLabel>Username</FieldLabel>

              <Input
                type="text"
                placeholder="ahmedali"
                {...form.register("username")}
              />

              <FieldError
                errors={[form.formState.errors.username]}
              />
            </Field>


            <Field className="mt-2">
              <div className="flex items-center justify-between">
                <FieldLabel>Email</FieldLabel>

                <button
                  type="button"
                  onClick={() => setChangeEmailStep("email")}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Pencil className="h-4 w-4" />
                  Change
                </button>
              </div>

              <div className="border px-4 py-2 text-sm text-gray-700">
                {user?.email}
              </div>
            </Field>


            <Field className="mt-2">
              <FieldLabel>Phone</FieldLabel>

              <div className="flex w-full items-center rounded-md border border-input bg-white">
                <button
                  type="button"
                  className="flex items-center gap-2 px-3"
                >
                  <img
                    src={EgyptFlag}
                    alt="Egypt"
                    className="w-6 object-cover"
                  />

                  <span className="text-sm font-medium">
                    EG(+20)
                  </span>

                  <ChevronDown className="w-4 text-gray-500" />
                </button>

                <ChevronsUpDown className="w-4 text-black" />

                <Input
                  type="tel"
                  placeholder="1012345678"
                  className="border-0 shadow-none focus-visible:outline-none focus-visible:ring-0"
                  {...form.register("phone")}
                />
              </div>

              <FieldError
                errors={[form.formState.errors.phone]}
              />
            </Field>

            <div className="grid grid-cols-1 gap-3 pt-6 sm:grid-cols-2">

              <Button
                type="button"
                variant="destructive"
                className="rounded-none bg-red-50 text-red-500 hover:bg-red-100"
                disabled={deleteAccountMutation.isPending}
                onClick={handleDeleteAccount}
              >
                {deleteAccountMutation.isPending
                  ? "Deleting..."
                  : "Delete My Account"}
              </Button>


              <Button
                type="submit"
                disabled={updateProfileMutation.isPending}
                className="rounded-none bg-blue-600 hover:bg-blue-700"
              >
                {updateProfileMutation.isPending
                  ? "Saving..."
                  : "Save Changes"}
              </Button>
            </div>
          </form>


          <ChangeEmailDialog
            open={changeEmailStep === "email"}
            onOpenChange={(open) => {
              if (!open) {
                setChangeEmailStep("closed");
              }
            }}
            onNext={() => {
              setChangeEmailStep("otp");
            }}
          />


          <VerifyEmailDialog
            open={changeEmailStep === "otp"}
            onOpenChange={(open) => {
              if (!open) {
                setChangeEmailStep("closed");
              }
            }}
            onSuccess={() => {
              setChangeEmailStep("closed");
            }}
          />

          <DeleteAccountDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            isPending={deleteAccountMutation.isPending}
            onConfirm={() => {
              deleteAccountMutation.mutate(undefined, {
                onSuccess: () => {
                  toast({
                    title: "Account deleted",
                    description: "Your account has been deleted successfully.",
                  });

                  setIsDeleteDialogOpen(false);
                },

                onError: (error) => {
                  console.error("Failed to delete account:", error);

                  toast({
                    title: "Delete failed",
                    description: "Something went wrong while deleting your account.",
                    variant: "destructive",
                  });
                },
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}