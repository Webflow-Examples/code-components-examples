import { useState, useRef, useEffect } from "react";

export interface MultiStepFormProps {
  id?: string;
  progressStyle?: "bar" | "stepper" | "dots";
  transitionDirection?: "slide" | "fade";
  numberOfSteps?: number;
  showReviewStep?: boolean;
  formTitle?: React.ReactNode;
  formDescription?: string;
  step1Title?: string;
  step1Description?: string;
  step1Visible?: boolean;
  step1Fields?: string;
  step2Title?: string;
  step2Description?: string;
  step2Visible?: boolean;
  step2Fields?: string;
  step3Title?: string;
  step3Description?: string;
  step3Visible?: boolean;
  step3Fields?: string;
  step4Title?: string;
  step4Description?: string;
  step4Visible?: boolean;
  step4Fields?: string;
  step5Title?: string;
  step5Description?: string;
  step5Visible?: boolean;
  step5Fields?: string;
  step6Title?: string;
  step6Description?: string;
  step6Visible?: boolean;
  step6Fields?: string;
  reviewStepTitle?: string;
  reviewStepDescription?: string;
  backButtonText?: string;
  nextButtonText?: string;
  submitButtonText?: string;
  validationErrorMessage?: string;
  successMessage?: string;
  showStepNumbers?: boolean;
  showStepDescriptions?: boolean;
  allowStepSkipping?: boolean;
  formAction?: string;
  editButtonText?: string;
}

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "checkbox";
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export default function MultiStepForm({
  id,
  progressStyle = "stepper",
  transitionDirection = "slide",
  numberOfSteps = 3,
  showReviewStep = true,
  formTitle = "Complete Your Application",
  formDescription = "Please fill out all required fields to continue",
  step1Title = "Personal Information",
  step1Description = "Tell us about yourself",
  step1Visible = true,
  step1Fields = "First Name|text|required|Enter your first name\nLast Name|text|required|Enter your last name\nDate of Birth|text|required|MM/DD/YYYY",
  step2Title = "Contact Details",
  step2Description = "How can we reach you?",
  step2Visible = true,
  step2Fields = "Email|email|required|your@email.com\nPhone|tel|required|(555) 123-4567\nPreferred Contact|select|required||Email,Phone,Text",
  step3Title = "Preferences",
  step3Description = "Customize your experience",
  step3Visible = true,
  step3Fields = "Newsletter|checkbox|optional|Subscribe to our newsletter\nNotifications|checkbox|optional|Receive email notifications\nComments|textarea|optional|Any additional comments",
  step4Title = "Additional Information",
  step4Description = "Any other details we should know",
  step4Visible = false,
  step4Fields = "Company|text|optional|Company name\nJob Title|text|optional|Your job title",
  step5Title = "Review & Confirm",
  step5Description = "Final details",
  step5Visible = false,
  step5Fields = "Terms|checkbox|required|I agree to the terms and conditions",
  step6Title = "Confirmation",
  step6Description = "Last step",
  step6Visible = false,
  step6Fields = "Signature|text|required|Type your full name",
  reviewStepTitle = "Review Your Information",
  reviewStepDescription = "Please review your information before submitting",
  backButtonText = "Back",
  nextButtonText = "Next",
  submitButtonText = "Submit",
  validationErrorMessage = "Please fill out all required fields before continuing",
  successMessage = "Thank you! Your form has been submitted successfully.",
  showStepNumbers = true,
  showStepDescriptions = true,
  allowStepSkipping = false,
  formAction = "#",
  editButtonText = "Edit",
}: MultiStepFormProps) {
  const parseFields = (fieldsString: string): FormField[] => {
    if (!fieldsString) return [];
    const lines = fieldsString.split(/\\n|\n/).filter(line => line.trim());
    return lines.map(line => {
      const parts = line.split("|");
      const [label, type, requiredStr, placeholder, optionsStr] = parts;
      return {
        name: label.toLowerCase().replace(/\s+/g, "_"),
        label: label.trim(),
        type: (type?.trim() || "text") as FormField["type"],
        required: requiredStr?.trim().toLowerCase() === "required",
        placeholder: placeholder?.trim() || "",
        options: optionsStr ? optionsStr.split(",").map(o => o.trim()) : undefined,
      };
    });
  };

  const allSteps = [
    { title: step1Title, description: step1Description, visible: step1Visible, fields: parseFields(step1Fields) },
    { title: step2Title, description: step2Description, visible: step2Visible, fields: parseFields(step2Fields) },
    { title: step3Title, description: step3Description, visible: step3Visible, fields: parseFields(step3Fields) },
    { title: step4Title, description: step4Description, visible: step4Visible, fields: parseFields(step4Fields) },
    { title: step5Title, description: step5Description, visible: step5Visible, fields: parseFields(step5Fields) },
    { title: step6Title, description: step6Description, visible: step6Visible, fields: parseFields(step6Fields) },
  ];

  const visibleSteps = allSteps.slice(0, numberOfSteps).filter(step => step.visible !== false);
  const totalSteps = showReviewStep ? visibleSteps.length + 1 : visibleSteps.length;

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string | boolean>>({});
  const [validationError, setValidationError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"forward" | "backward">("forward");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setValidationError("");
  }, [currentStep]);

  const getCurrentStepFields = (): FormField[] => {
    if (currentStep < visibleSteps.length) {
      return visibleSteps[currentStep].fields;
    }
    return [];
  };

  const validateCurrentStep = (): boolean => {
    const fields = getCurrentStepFields();
    for (const field of fields) {
      if (field.required) {
        const value = formData[field.name];
        if (field.type === "checkbox") {
          if (!value) return false;
        } else {
          if (!value || (typeof value === "string" && !value.trim())) return false;
        }
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      setValidationError(validationErrorMessage);
      return;
    }
    setValidationError("");
    setSlideDirection("forward");
    setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
  };

  const handleBack = () => {
    setValidationError("");
    setSlideDirection("backward");
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleStepClick = (stepIndex: number) => {
    if (!allowStepSkipping) return;
    if (stepIndex >= currentStep) return;
    setValidationError("");
    setSlideDirection(stepIndex < currentStep ? "backward" : "forward");
    setCurrentStep(stepIndex);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentStep()) {
      setValidationError(validationErrorMessage);
      return;
    }
    setIsSubmitted(true);
  };

  const handleFieldChange = (fieldName: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleEdit = (stepIndex: number) => {
    setSlideDirection("backward");
    setCurrentStep(stepIndex);
  };

  const renderProgressBar = () => {
    const progress = ((currentStep + 1) / totalSteps) * 100;
    return (
      <div className="wf-multistepform-progress-bar">
        <div
          className="wf-multistepform-progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  const renderProgressStepper = () => {
    return (
      <div className="wf-multistepform-progress-stepper">
        {visibleSteps.map((step, index) => (
          <div
            key={index}
            className={`wf-multistepform-progress-step ${
              index < currentStep ? "wf-multistepform-progress-step-completed" : ""
            } ${index === currentStep ? "wf-multistepform-progress-step-active" : ""} ${
              allowStepSkipping && index < currentStep ? "wf-multistepform-progress-step-clickable" : ""
            }`}
            onClick={() => handleStepClick(index)}
          >
            <div className="wf-multistepform-progress-step-circle">
              {showStepNumbers && <span className="wf-multistepform-progress-step-number">{index + 1}</span>}
            </div>
            <div className="wf-multistepform-progress-step-label">{step.title}</div>
          </div>
        ))}
        {showReviewStep && (
          <div
            className={`wf-multistepform-progress-step ${
              currentStep === visibleSteps.length ? "wf-multistepform-progress-step-active" : ""
            }`}
          >
            <div className="wf-multistepform-progress-step-circle">
              {showStepNumbers && <span className="wf-multistepform-progress-step-number">{visibleSteps.length + 1}</span>}
            </div>
            <div className="wf-multistepform-progress-step-label">{reviewStepTitle}</div>
          </div>
        )}
      </div>
    );
  };

  const renderProgressDots = () => {
    return (
      <div className="wf-multistepform-progress-dots">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`wf-multistepform-progress-dot ${
              index < currentStep ? "wf-multistepform-progress-dot-completed" : ""
            } ${index === currentStep ? "wf-multistepform-progress-dot-active" : ""} ${
              allowStepSkipping && index < currentStep ? "wf-multistepform-progress-dot-clickable" : ""
            }`}
            onClick={() => handleStepClick(index)}
          />
        ))}
      </div>
    );
  };

  const renderProgress = () => {
    switch (progressStyle) {
      case "bar":
        return renderProgressBar();
      case "dots":
        return renderProgressDots();
      case "stepper":
      default:
        return renderProgressStepper();
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name] || "";

    switch (field.type) {
      case "textarea":
        return (
          <div key={field.name} className="wf-multistepform-field">
            <label className="wf-multistepform-label" htmlFor={field.name}>
              {field.label}
              {field.required && <span className="wf-multistepform-required">*</span>}
            </label>
            <textarea
              id={field.name}
              name={field.name}
              className="wf-multistepform-textarea"
              value={value as string}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
            />
          </div>
        );

      case "select":
        return (
          <div key={field.name} className="wf-multistepform-field">
            <label className="wf-multistepform-label" htmlFor={field.name}>
              {field.label}
              {field.required && <span className="wf-multistepform-required">*</span>}
            </label>
            <select
              id={field.name}
              name={field.name}
              className="wf-multistepform-select"
              value={value as string}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              required={field.required}
            >
              <option value="">Select an option</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );

      case "checkbox":
        return (
          <div key={field.name} className="wf-multistepform-field wf-multistepform-field-checkbox">
            <label className="wf-multistepform-checkbox-label">
              <input
                type="checkbox"
                id={field.name}
                name={field.name}
                className="wf-multistepform-checkbox"
                checked={!!value}
                onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                required={field.required}
              />
              <span className="wf-multistepform-checkbox-text">
                {field.label}
                {field.required && <span className="wf-multistepform-required">*</span>}
              </span>
            </label>
          </div>
        );

      default:
        return (
          <div key={field.name} className="wf-multistepform-field">
            <label className="wf-multistepform-label" htmlFor={field.name}>
              {field.label}
              {field.required && <span className="wf-multistepform-required">*</span>}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              className="wf-multistepform-input"
              value={value as string}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
            />
          </div>
        );
    }
  };

  const renderStepContent = () => {
    if (currentStep < visibleSteps.length) {
      const step = visibleSteps[currentStep];
      return (
        <div
          className={`wf-multistepform-step ${
            transitionDirection === "slide"
              ? slideDirection === "forward"
                ? "wf-multistepform-step-slide-in-right"
                : "wf-multistepform-step-slide-in-left"
              : "wf-multistepform-step-fade-in"
          }`}
        >
          <div className="wf-multistepform-step-header">
            <h2 className="wf-multistepform-step-title">{step.title}</h2>
            {showStepDescriptions && step.description && (
              <p className="wf-multistepform-step-description">{step.description}</p>
            )}
          </div>
          <div className="wf-multistepform-fields">
            {step.fields.map(field => renderField(field))}
          </div>
        </div>
      );
    }

    return (
      <div
        className={`wf-multistepform-step ${
          transitionDirection === "slide"
            ? "wf-multistepform-step-slide-in-right"
            : "wf-multistepform-step-fade-in"
        }`}
      >
        <div className="wf-multistepform-step-header">
          <h2 className="wf-multistepform-step-title">{reviewStepTitle}</h2>
          {showStepDescriptions && reviewStepDescription && (
            <p className="wf-multistepform-step-description">{reviewStepDescription}</p>
          )}
        </div>
        <div className="wf-multistepform-review">
          {visibleSteps.map((step, stepIndex) => (
            <div key={stepIndex} className="wf-multistepform-review-section">
              <div className="wf-multistepform-review-section-header">
                <h3 className="wf-multistepform-review-section-title">{step.title}</h3>
                <button
                  type="button"
                  className="wf-multistepform-review-edit-button"
                  onClick={() => handleEdit(stepIndex)}
                >
                  {editButtonText}
                </button>
              </div>
              <div className="wf-multistepform-review-fields">
                {step.fields.map(field => {
                  const value = formData[field.name];
                  if (!value) return null;
                  return (
                    <div key={field.name} className="wf-multistepform-review-field">
                      <span className="wf-multistepform-review-field-label">{field.label}:</span>
                      <span className="wf-multistepform-review-field-value">
                        {field.type === "checkbox" ? (value ? "Yes" : "No") : value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="wf-multistepform wf-multistepform-submitted">
        <div className="wf-multistepform-success">
          <div className="wf-multistepform-success-icon">✓</div>
          <h2 className="wf-multistepform-success-title">Success!</h2>
          <p className="wf-multistepform-success-message">{successMessage}</p>
        </div>
      </div>
    );
  }

  const isReviewStep = showReviewStep && currentStep === visibleSteps.length;
  const isLastStep = !showReviewStep && currentStep === visibleSteps.length - 1;

  return (
    <div className="wf-multistepform">
      <div className="wf-multistepform-container">
        <header className="wf-multistepform-header">
          <h1 className="wf-multistepform-title">{formTitle}</h1>
          {formDescription && <p className="wf-multistepform-description">{formDescription}</p>}
        </header>

        <div className="wf-multistepform-progress">{renderProgress()}</div>

        <form
          id={id}
          ref={formRef}
          className="wf-multistepform-form"
          onSubmit={handleSubmit}
          action={formAction}
          method="POST"
        >
          <div className="wf-multistepform-content">{renderStepContent()}</div>

          {validationError && (
            <div className="wf-multistepform-error" role="alert">
              {validationError}
            </div>
          )}

          <div className="wf-multistepform-navigation">
            {currentStep > 0 && (
              <button
                type="button"
                className="wf-multistepform-button wf-multistepform-button-back"
                onClick={handleBack}
              >
                {backButtonText}
              </button>
            )}
            {!isReviewStep && !isLastStep && (
              <button
                type="button"
                className="wf-multistepform-button wf-multistepform-button-next"
                onClick={handleNext}
              >
                {nextButtonText}
              </button>
            )}
            {(isReviewStep || isLastStep) && (
              <button
                type="submit"
                className="wf-multistepform-button wf-multistepform-button-submit"
              >
                {submitButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}