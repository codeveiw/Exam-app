import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle} from "lucide-react";

interface DeleteAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending?: boolean;
}

export default function DeleteAccountDialog({
  open,
  onOpenChange,
  onConfirm,
  isPending = false,
}: DeleteAccountDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl rounded-none p-0">
        
      
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-5 top-4 text-gray-500 hover:text-gray-700"
        >
         
        </button>

   
        <div className="flex flex-col items-center px-6 pt-10">
          
          {/* Warning icon */}
          <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-red-50">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-10 w-10 text-red-500" />
            </div>
          </div>

          <h2 className="text-center text-xl font-semibold text-red-600">
            Are you sure you want to delete your account?
          </h2>

          <p className="mt-2 text-center text-sm text-gray-500">
            This action is permanent and cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-14 grid grid-cols-2 gap-3 border-t px-14 py-5">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="h-12 rounded-none bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="h-12 rounded-none bg-red-600 text-white hover:bg-red-700"
          >
            {isPending ? "Deleting..." : "Yes, delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}