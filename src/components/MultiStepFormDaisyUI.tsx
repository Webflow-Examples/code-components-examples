import React, { useState, useEffect, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";

// Types for form configuration based on the actual Google Sheet structure
interface FormField {
  step: number;
  fieldName: string; // Column B: Field Name (id)
  userLabel: string; // Column C: User Label
  fieldType: string; // Column D: Field Type
  options?: string; // Column E: Options
  validation?: string; // Column F: Validation
  format?: string; // Column G: Format
  minCharacters?: string; // Column H: Min Characters
  maxCharacters?: string; // Column I: Max Characters
  placeholder?: string; // Column J: Placeholder
  required: boolean; // Column K: Required
  showIf?: string; // Column L: Show If (Logic/Condition)
}

interface FormData {
  [key: string]: string | string[] | boolean | number;
}

interface MultiStepFormProps {
  googleSheetUrl: string;
  submitUrl: string;
}

interface FormState {
  currentStep: number;
  isLoading: boolean;
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string;
}

const MultiStepFormDaisyUI: React.FC<MultiStepFormProps> = ({
  googleSheetUrl,
  submitUrl,
}) => {
  const [fields, setFields] = useState<FormField[]>([]);
  const [state, setState] = useState<FormState>({
    currentStep: 1,
    isLoading: true,
    isSubmitting: false,
    submitSuccess: false,
    submitError: "",
  });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    control,
  } = useForm<FormData>();

  // Watch all form values for conditional logic
  const watchedValues = useWatch({ control });

  // Parse Google Sheet URL to CSV export URL
  const getSheetCsvUrl = useCallback((url: string): string => {
    try {
      const sheetIdMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      if (!sheetIdMatch) throw new Error("Invalid Google Sheets URL");

      const sheetId = sheetIdMatch[1];
      return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    } catch (error) {
      console.error("Error parsing sheet URL:", error);
      return "";
    }
  }, []);

  // Parse CSV data into form fields
  const parseSheetData = useCallback((csvText: string): FormField[] => {
    const lines = csvText.split("\n").filter((line) => line.trim());
    if (lines.length < 2) return [];

    const rows = lines.slice(1);

    return rows
      .map((row) => {
        const values = row.split(",").map((v) => v.replace(/"/g, "").trim());

        // Skip empty rows
        if (!values[0] || !values[1] || !values[2]) return null;

        const field: FormField = {
          step: parseInt(values[0]) || 1,
          fieldName: values[1] || "",
          userLabel: values[2] || "",
          fieldType: values[3] || "text",
          options: values[4] || "",
          validation: values[5] || "",
          format: values[6] || "",
          minCharacters: values[7] || "",
          maxCharacters: values[8] || "",
          placeholder: values[9] || "",
          required: Boolean(
            values[10]?.toLowerCase() === "yes" ||
              values[10]?.toLowerCase() === "true"
          ),
          showIf: values[11] || "",
        };

        return field;
      })
      .filter(
        (field): field is FormField =>
          field !== null &&
          Boolean(field.fieldName) &&
          Boolean(field.userLabel) &&
          Boolean(field.fieldType)
      );
  }, []);

  // Load form configuration from Google Sheet
  useEffect(() => {
    if (!googleSheetUrl) {
      setState((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    const loadFormConfig = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const csvUrl = getSheetCsvUrl(googleSheetUrl);

        if (!csvUrl) throw new Error("Invalid sheet URL");

        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error("Failed to fetch sheet data");

        const csvText = await response.text();
        const parsedFields = parseSheetData(csvText);

        if (parsedFields.length === 0) {
          throw new Error("No valid form fields found in sheet");
        }

        setFields(parsedFields);
        setState((prev) => ({
          ...prev,
          isLoading: false,
          currentStep: Math.min(...parsedFields.map((f) => f.step)),
        }));
      } catch (error) {
        console.error("Error loading form config:", error);
        setState((prev) => ({
          ...prev,
          isLoading: false,
          submitError: `Failed to load form configuration: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        }));
      }
    };

    loadFormConfig();
  }, [googleSheetUrl, getSheetCsvUrl, parseSheetData]);

  // Evaluate conditional logic
  const evaluateShowIf = useCallback(
    (condition: string, formValues: any): boolean => {
      if (!condition) return true;

      try {
        // Simple condition parser for basic logic like "field = 'value'" or "field > number"
        const cleanCondition = condition.trim();

        // Handle "show if field = 'value'" format
        const equalMatch = cleanCondition.match(/(\w+)\s*=\s*'([^']+)'/);
        if (equalMatch) {
          const [, fieldName, expectedValue] = equalMatch;
          return formValues[fieldName] === expectedValue;
        }

        // Handle "show if field > number" format
        const greaterMatch = cleanCondition.match(/(\w+)\s*>\s*(\d+)/);
        if (greaterMatch) {
          const [, fieldName, threshold] = greaterMatch;
          const fieldValue = parseInt(formValues[fieldName]) || 0;
          return fieldValue > parseInt(threshold);
        }

        // Handle multiple conditions with "and"
        if (cleanCondition.includes(" and ")) {
          const conditions = cleanCondition.split(" and ");
          return conditions.every((cond) =>
            evaluateShowIf(cond.trim(), formValues)
          );
        }

        return true;
      } catch (error) {
        console.error("Error evaluating condition:", condition, error);
        return true;
      }
    },
    []
  );

  // Get fields for current step with conditional logic
  const getCurrentStepFields = useCallback(() => {
    return fields.filter((field) => {
      const isCorrectStep = field.step === state.currentStep;
      const shouldShow = evaluateShowIf(
        field.showIf || "",
        watchedValues || {}
      );
      return isCorrectStep && shouldShow;
    });
  }, [fields, state.currentStep, evaluateShowIf, watchedValues]);

  // Get total number of steps
  const getTotalSteps = useCallback(() => {
    if (fields.length === 0) return 1;
    return Math.max(...fields.map((field) => field.step));
  }, [fields]);

  // Create validation rules for React Hook Form
  const getValidationRules = useCallback((field: FormField) => {
    const rules: any = {};

    if (field.required) {
      rules.required = `${field.userLabel} is required`;
    }

    if (field.minCharacters) {
      const min = parseInt(field.minCharacters);
      if (!isNaN(min)) {
        rules.minLength = {
          value: min,
          message: `${field.userLabel} must be at least ${min} characters`,
        };
      }
    }

    if (field.maxCharacters) {
      const max = parseInt(field.maxCharacters);
      if (!isNaN(max)) {
        rules.maxLength = {
          value: max,
          message: `${field.userLabel} must be no more than ${max} characters`,
        };
      }
    }

    if (field.fieldType.toLowerCase() === "email") {
      rules.pattern = {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email address",
      };
    }

    if (field.fieldType.toLowerCase() === "number") {
      rules.pattern = {
        value: /^\d+$/,
        message: "Please enter a valid number",
      };
    }

    if (field.validation) {
      try {
        const regex = new RegExp(field.validation);
        rules.pattern = {
          value: regex,
          message: `${field.userLabel} format is invalid`,
        };
      } catch (error) {
        console.error("Invalid validation regex:", field.validation);
      }
    }

    return rules;
  }, []);

  // Handle next step
  const handleNext = useCallback(async () => {
    const currentFields = getCurrentStepFields();
    const fieldNames = currentFields.map((f) => f.fieldName);

    const isValid = await trigger(fieldNames);

    if (isValid) {
      setState((prev) => ({
        ...prev,
        currentStep: Math.min(prev.currentStep + 1, getTotalSteps()),
      }));
    }
  }, [getCurrentStepFields, trigger, getTotalSteps]);

  // Handle previous step
  const handlePrevious = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1),
    }));
  }, []);

  // Handle form submission
  const onSubmit = useCallback(
    async (data: FormData) => {
      if (!submitUrl) return;

      setState((prev) => ({ ...prev, isSubmitting: true, submitError: "" }));

      try {
        const response = await fetch(submitUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(
            `Submission failed: ${response.status} ${response.statusText}`
          );
        }

        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          submitSuccess: true,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          submitError:
            error instanceof Error ? error.message : "Submission failed",
        }));
      }
    },
    [submitUrl]
  );

  // Render field based on type using DaisyUI components
  const renderField = useCallback(
    (field: FormField) => {
      const error = errors[field.fieldName];
      const validationRules = getValidationRules(field);

      switch (field.fieldType.toLowerCase()) {
        case "textarea":
          return (
            <textarea
              key={field.fieldName}
              {...register(field.fieldName, validationRules)}
              className={`textarea textarea-bordered w-full ${
                error ? "textarea-error" : ""
              }`}
              placeholder={field.placeholder}
              rows={4}
            />
          );

        case "dropdown":
        case "select":
          const options =
            field.options?.split(",").map((o) => o.trim().replace(/"/g, "")) ||
            [];
          return (
            <select
              key={field.fieldName}
              {...register(field.fieldName, validationRules)}
              className={`select select-bordered w-full ${
                error ? "select-error" : ""
              }`}
            >
              <option value="">Select an option...</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          );

        case "radio":
          const radioOptions =
            field.options?.split(",").map((o) => o.trim().replace(/"/g, "")) ||
            [];
          return (
            <div key={field.fieldName} className="space-y-2">
              {radioOptions.map((option, index) => (
                <div key={index} className="form-control">
                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      type="radio"
                      {...register(field.fieldName, validationRules)}
                      value={option}
                      className="radio radio-primary"
                    />
                    <span className="label-text">{option}</span>
                  </label>
                </div>
              ))}
            </div>
          );

        case "checkbox":
          const checkboxOptions =
            field.options?.split(",").map((o) => o.trim().replace(/"/g, "")) ||
            [];
          return (
            <div key={field.fieldName} className="space-y-2">
              {checkboxOptions.map((option, index) => (
                <div key={index} className="form-control">
                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      type="checkbox"
                      {...register(
                        `${field.fieldName}.${index}`,
                        validationRules
                      )}
                      value={option}
                      className="checkbox checkbox-primary"
                    />
                    <span className="label-text">{option}</span>
                  </label>
                </div>
              ))}
            </div>
          );

        case "number":
          return (
            <input
              key={field.fieldName}
              type="number"
              {...register(field.fieldName, validationRules)}
              className={`input input-bordered w-full ${
                error ? "input-error" : ""
              }`}
              placeholder={field.placeholder}
            />
          );

        case "email":
          return (
            <input
              key={field.fieldName}
              type="email"
              {...register(field.fieldName, validationRules)}
              className={`input input-bordered w-full ${
                error ? "input-error" : ""
              }`}
              placeholder={field.placeholder}
            />
          );

        default: // text box
          return (
            <input
              key={field.fieldName}
              type="text"
              {...register(field.fieldName, validationRules)}
              className={`input input-bordered w-full ${
                error ? "input-error" : ""
              }`}
              placeholder={field.placeholder}
            />
          );
      }
    },
    [register, errors, getValidationRules]
  );

  // Loading state
  if (state.isLoading) {
    return (
      <div className="card w-full max-w-2xl bg-base-100">
        <div className="card-body">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-base-content">Loading form configuration...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (state.submitError && fields.length === 0) {
    return (
      <div className="card w-full max-w-2xl bg-base-100">
        <div className="card-body">
          <div className="text-error mb-4">
            <svg
              className="mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="card-title text-error">Configuration Error</h3>
          <p className="text-base-content mb-4">{state.submitError}</p>
          <div className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <span className="text-sm">
              Please check your Google Sheet URL and ensure it has the proper
              format
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (state.submitSuccess) {
    return (
      <div className="card w-full max-w-2xl bg-base-100">
        <div className="card-body">
          <div className="text-success mb-4">
            <svg
              className="mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="card-title text-success">Thank You!</h3>
          <p className="text-base-content">
            Your form has been submitted successfully.
          </p>
        </div>
      </div>
    );
  }

  const currentFields = getCurrentStepFields();
  const totalSteps = getTotalSteps();
  const isLastStep = state.currentStep === totalSteps;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card w-full max-w-4xl bg-base-100"
    >
      {/* Progress Section */}
      <div className="card-body">
        {/* Progress Section */}
        {/* Progress Bar */}
        <progress
          className="progress progress-primary w-full mb-6"
          value={state.currentStep}
          max={totalSteps}
        ></progress>

        {/* Removed: Steps Indicator */}

        {/* Form Fields */}
        <div className="space-y-6">
          {currentFields.map((field) => (
            <div key={field.fieldName} className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">
                  {field.userLabel}
                  {field.required && <span className="text-error ml-1">*</span>}
                </span>
              </label>
              {renderField(field)}
              {errors[field.fieldName] && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    <svg
                      className="mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {errors[field.fieldName]?.message}
                  </span>
                </label>
              )}
            </div>
          ))}
        </div>

        {/* Error Message */}
        {state.submitError && (
          <div className="alert alert-error mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{state.submitError}</span>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="card-actions mt-8">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={state.currentStep === 1}
            className="btn btn-outline btn-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>

          {isLastStep ? (
            <button
              type="submit"
              disabled={state.isSubmitting || !submitUrl}
              className="btn btn-primary"
            >
              {state.isSubmitting && (
                <span className="loading loading-spinner mr-2"></span>
              )}
              {state.isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  Submit Form
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary"
            >
              Next Step
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default MultiStepFormDaisyUI;
