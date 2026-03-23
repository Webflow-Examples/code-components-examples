import { useState, useEffect } from "react";

export interface ProgressStepperProps {
  id?: string;
  orientation?: "horizontal" | "vertical";
  clickable?: boolean;
  currentStep?: number;
  totalSteps?: number;
  step1Label?: string;
  step1Description?: string;
  step1Visible?: boolean;
  step2Label?: string;
  step2Description?: string;
  step2Visible?: boolean;
  step3Label?: string;
  step3Description?: string;
  step3Visible?: boolean;
  step4Label?: string;
  step4Description?: string;
  step4Visible?: boolean;
  step5Label?: string;
  step5Description?: string;
  step5Visible?: boolean;
  step6Label?: string;
  step6Description?: string;
  step6Visible?: boolean;
  step7Label?: string;
  step7Description?: string;
  step7Visible?: boolean;
  step8Label?: string;
  step8Description?: string;
  step8Visible?: boolean;
  showDescriptions?: boolean;
}

export default function ProgressStepper({
  id,
  orientation = "horizontal",
  clickable = false,
  currentStep = 1,
  totalSteps = 4,
  step1Label = "Account Setup",
  step1Description = "Create your account",
  step1Visible = true,
  step2Label = "Personal Info",
  step2Description = "Enter your details",
  step2Visible = true,
  step3Label = "Payment",
  step3Description = "Add payment method",
  step3Visible = true,
  step4Label = "Confirmation",
  step4Description = "Review and confirm",
  step4Visible = true,
  step5Label = "Preferences",
  step5Description = "Set your preferences",
  step5Visible = true,
  step6Label = "Verification",
  step6Description = "Verify your identity",
  step6Visible = true,
  step7Label = "Integration",
  step7Description = "Connect your tools",
  step7Visible = true,
  step8Label = "Complete",
  step8Description = "Finish setup",
  step8Visible = true,
  showDescriptions = true,
}: ProgressStepperProps) {
  const [activeStep, setActiveStep] = useState(currentStep);

  useEffect(() => {
    setActiveStep(currentStep);
  }, [currentStep]);

  const allSteps = [
    { label: step1Label, description: step1Description, visible: step1Visible },
    { label: step2Label, description: step2Description, visible: step2Visible },
    { label: step3Label, description: step3Description, visible: step3Visible },
    { label: step4Label, description: step4Description, visible: step4Visible },
    { label: step5Label, description: step5Description, visible: step5Visible },
    { label: step6Label, description: step6Description, visible: step6Visible },
    { label: step7Label, description: step7Description, visible: step7Visible },
    { label: step8Label, description: step8Description, visible: step8Visible },
  ];

  const visibleSteps = allSteps
    .slice(0, totalSteps)
    .filter((step) => step.visible !== false);

  const handleStepClick = (stepIndex: number) => {
    if (clickable && stepIndex < activeStep) {
      setActiveStep(stepIndex);
    }
  };

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < activeStep) return "completed";
    if (stepIndex === activeStep) return "current";
    return "upcoming";
  };

  return (
    <div
      id={id}
      className={`wf-progressstepper wf-progressstepper-${orientation}`}
    >
      <div className="wf-progressstepper-container">
        {visibleSteps.map((step, index) => {
          const stepNumber = index + 1;
          const status = getStepStatus(stepNumber);
          const isClickable = clickable && stepNumber < activeStep;

          return (
            <div key={index} className="wf-progressstepper-step-wrapper">
              <div
                className={`wf-progressstepper-step wf-progressstepper-step-${status}`}
              >
                <button
                  type="button"
                  className={`wf-progressstepper-circle ${
                    isClickable ? "wf-progressstepper-circle-clickable" : ""
                  }`}
                  onClick={() => handleStepClick(stepNumber)}
                  disabled={!isClickable}
                  aria-label={`Step ${stepNumber}: ${step.label}`}
                  aria-current={status === "current" ? "step" : undefined}
                >
                  {status === "completed" ? (
                    <svg
                      className="wf-progressstepper-checkmark"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <span className="wf-progressstepper-number">
                      {stepNumber}
                    </span>
                  )}
                </button>
                <div className="wf-progressstepper-content">
                  <div className="wf-progressstepper-label">{step.label}</div>
                  {showDescriptions && step.description && (
                    <div className="wf-progressstepper-description">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
              {index < visibleSteps.length - 1 && (
                <div
                  className={`wf-progressstepper-connector wf-progressstepper-connector-${
                    stepNumber < activeStep ? "completed" : "upcoming"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}