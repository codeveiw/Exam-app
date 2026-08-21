import { AlertTriangle } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ClearLogsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    isClearing?: boolean;
    title?: string;
    description?: string;
}

export function ClearLogsModal({
    open,
    onOpenChange,
    onConfirm,
    isClearing,
    title,
    description,
}: ClearLogsModalProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-[400px]">
                <AlertDialogHeader className="flex flex-col items-center justify-center text-center space-y-4 pt-4">
                    <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center">
                        <AlertTriangle className="h-8 w-8 text-red-500" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1">
                        <AlertDialogTitle className="text-red-500 text-lg font-medium text-center">
                            {title || "Are you sure you want to clear all logs?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-500 font-mono text-xs mt-2 text-center">
                            {description || "This action is permanent and cannot be undone."}
                        </AlertDialogDescription>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex w-full mt-6 sm:space-x-4">
                    <AlertDialogCancel
                        disabled={isClearing}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 border-0 h-10 font-mono text-xs uppercase"
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            onConfirm();
                        }}
                        disabled={isClearing}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white h-10 font-mono text-xs uppercase"
                    >
                        Yes, clear
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
