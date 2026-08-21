

interface EmailChangeStepperProps {
  currentStep: 1 | 2;
}

export default function EmailChangeStepper({
  currentStep,
}: EmailChangeStepperProps) {

  return (
    <div className="flex items-center w-full pt-5">

      <div
        className={`h-2.5 w-2.5 rotate-45 ${
          currentStep >= 1 ? "bg-blue-600" : "bg-gray-300"
        }`}
      />


      <div
        className={`h-px flex-1 border-t border-dashed px-2 ${
          currentStep >= 2
            ? "border-blue-600"
            : "border-blue-300"
        }`}
      />


      <div
        className={`h-2.5 w-2.5 rotate-45 ${
          currentStep >= 2 ? "bg-blue-600" : "bg-gray-300"
        }`}
      />
    </div>
  );
}