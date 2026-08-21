import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md text-center space-y-8">
                <div className="space-y-2">
                    <div className="relative">
                        <span className="text-[10rem] font-black text-gray-100 leading-none select-none block">
                            404
                        </span>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-20 w-20 text-gray-400"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                                <path d="M11 8v3" />
                                <path d="M11 14h.01" />
                            </svg>
                        </div>
                    </div>
                </div>

                <Separator />

                <div className="space-y-3">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Page not found
                    </h1>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        The page you're looking for doesn't exist or has been moved.
                        <br />
                        Double-check the URL or return to safety.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button
                        onClick={() => navigate(-1)}
                        variant="outline"
                        className="w-full sm:w-auto border-gray-200 text-gray-700 hover:bg-gray-100"
                    >
                        Go Back
                    </Button>
                    <Button
                        onClick={() => navigate("/dashboard")}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Back to Dashboard
                    </Button>
                </div>

                <p className="text-xs text-gray-400 font-mono pt-4">
                    Error 404 — Not Found
                </p>
            </div>
        </div>
    );
}
