import { useLocation } from "react-router-dom";

const steps = [
  "/auth/register",
  "/auth/verify-email",
  "/auth/complete-account",
  "/auth/create-password",
];

export default function RegistrationStepper() {
  const location = useLocation();

  const currentStep = steps.indexOf(location.pathname) + 1;
  if (
    location.pathname === "/auth/login" ||
    location.pathname === "/auth/register"||
    location.pathname === "/auth/forgot-password" ||
    location.pathname === "/auth/reset-password" ||
    location.pathname === "/auth/reset-send" 
  
  ) {
    return null;
  }

  return (
    <div className="flex w-full items-center max-w-md justify-between">
      {steps.map((_, index) => {
        const step = index + 1;

        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;

        return (
          <div key={step} className="flex flex-1 last:flex-none items-center">
       
            <div
              className={`
                flex h-3 w-3 rotate-45 items-center justify-center
                border border-blue-600
                ${isCompleted || isCurrent
                  ? "bg-blue-600"
                  : "bg-white"
                }
              `}
            />

         
            {index < steps.length - 1 && (
              <div
                className={`
                  mx-2 h-px flex-1
                  ${step < currentStep
                    ? "bg-blue-600"
                    : "border-t border-dashed border-blue-600"
                  }
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}