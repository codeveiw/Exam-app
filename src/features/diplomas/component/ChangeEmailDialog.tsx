import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import EmailChangeStepper from "./EmailChangeStepper";
import useRequestEmailChange from "../hooks/useRequestEmailChange";

interface ChangeEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNext: () => void;
}

export default function ChangeEmailDialog({
  open,
  onOpenChange,
  onNext,
}: ChangeEmailDialogProps) {
  const [email, setEmail] = useState("");

  const requestEmailChangeMutation = useRequestEmailChange();

  const handleNext = () => {
    requestEmailChangeMutation.mutate(
      {
        newEmail: email,
      },
      {
        onSuccess: () => {
          onNext();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-none p-0">

        <DialogHeader className="px-5 py-4">
          <EmailChangeStepper currentStep={1} />

          <DialogTitle className="pt-3 text-3xl font-bold text-gray-800">
            Change Email
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 px-5 pb-5">

          <div>
            <h2 className="mb-4 text-2xl font-bold text-blue-600">
              Enter your new email
            </h2>

            <label className="mb-2 block text-xs font-medium text-gray-700">
              Email
            </label>

            <Input
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="my-3 h-10 rounded-none"
            />
          </div>

          <Button
            type="button"
            onClick={handleNext}
            disabled={requestEmailChangeMutation.isPending}
            className="my-4 h-10 w-full rounded-none bg-blue-600 text-sm hover:bg-blue-700"
          >
            {requestEmailChangeMutation.isPending
              ? "Sending..."
              : "Next"}

            {!requestEmailChangeMutation.isPending && (
              <span className="ml-2">›</span>
            )}
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}