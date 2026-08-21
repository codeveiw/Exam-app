import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import EmailChangeStepper from "./EmailChangeStepper";
import useConfirmEmail from "../hooks/useConfirmEmail";
import { Field } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";


interface VerifyEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function VerifyEmailDialog({
  open,
  onOpenChange,
  onSuccess,
}: VerifyEmailDialogProps) {
  const [code, setCode] = useState("");

  const confirmEmailMutation = useConfirmEmail();

const handleConfirm = () => {
  if (!code.trim()) return;

  confirmEmailMutation.mutate(
    {
      code: code.trim(),
    },
    {
      onSuccess: (data) => {
        console.log("EMAIL CONFIRMED:", data);

        onSuccess();
        onOpenChange(false);
      },

      onError: (error) => {
        console.error("OTP ERROR:", error);
      },
    }
  );
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-none p-0">
        <DialogHeader className="px-5 py-4">
          <EmailChangeStepper currentStep={2} />

          <DialogTitle className="pt-3 text-3xl font-bold text-gray-800">
            Verify Email
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 px-5 pb-5">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-blue-600">
              Enter verification code
            </h2>

            <p className="text-sm text-gray-500">
              Enter the verification code sent to your new email.
            </p>
          </div>

          <Field>
            <InputOTP
              maxLength={6}
              value={code}
              onChange={setCode}
            >
              <InputOTPGroup className="gap-4">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </Field>

          <Button
            type="button"
            onClick={handleConfirm}
            disabled={
              confirmEmailMutation.isPending ||
              code.length !== 6
            }
            className="h-10 w-full rounded-none bg-blue-600 hover:bg-blue-700"
          >
            {confirmEmailMutation.isPending
              ? "Verifying..."
              : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}