import React, { useState, useEffect, useCallback, useRef } from "react";
import { useWebflowContext } from "@webflow/react";

const DynamicFormGenerator = ({
  animateCards,
  formName = "Dynamic Form",
  formConfig,
  webhookUrl,
  devMode = "false",
  formID = "",
}) => {
  // Ensure hooks are called in the correct order and safely
  const [formData, setFormData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [showJsonPreview, setShowJsonPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [direction, setDirection] = useState("next");
  const abortControllerRef = useRef(null);

  const { mode, locale, interactive } = useWebflowContext();
  console.log("WEBFLOW CONTEXT");
  console.log(mode, locale, interactive);

  // Ensure component is properly mounted before using hooks
  const [isMounted, setIsMounted] = useState(false);

  // Parse form configuration from JSON string
  const fetchFormConfig = useCallback(async (input) => {
    // Abort any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create an AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      setLoading(true);
      setError("");

      let data;

      try {
        // Handle case where JSON string is wrapped in double quotes
        let jsonString = input.trim();
        if (jsonString.startsWith('"') && jsonString.endsWith('"')) {
          // Remove the outer quotes and unescape
          jsonString = jsonString
            .slice(1, -1)
            .replace(/\\"/g, '"')
            .replace(/\\\\/g, "\\");
        }

        // Parse JSON string
        data = JSON.parse(jsonString);
      } catch (error) {
        throw new Error(
          "Invalid JSON format. Please check your JSON syntax. Common issues: use double quotes instead of single quotes, ensure proper escaping."
        );
      }

      // Filter out empty rows and validate structure
      const validRows = data.filter(
        (row) => row.Step && row["Field Name"] && row["Field Type"]
      );

      if (validRows.length === 0) {
        throw new Error("No valid form fields found in spreadsheet");
      }

      // Group fields by step
      const steps = {};
      validRows.forEach((row) => {
        const step = parseInt(row.Step);
        if (!steps[step]) {
          steps[step] = [];
        }

        steps[step].push({
          fieldName: row["Field Name"],
          label: row["User Label"] || row["Field Name"],
          type: row["Field Type"],
          options: row.Options
            ? row.Options.split(",").map((opt) => opt.trim())
            : [],
          validation: row.Validation,
          placeholder: row.Placeholder || "",
          required:
            row.Required === "Yes" ||
            row.Required === "checked" ||
            row.Required === "Checked",
          minChars: row["Min Characters"]
            ? parseInt(row["Min Characters"].replace(/,/g, ""))
            : null,
          maxChars: row["Max Characters"]
            ? parseInt(row["Max Characters"].replace(/,/g, ""))
            : null,
          showIf: row["Show If (Logic/Condition)"] || null,
        });
      });

      // Get the actual step numbers and sort them
      const stepNumbers = Object.keys(steps)
        .map(Number)
        .sort((a, b) => a - b);
      const totalSteps = stepNumbers.length;

      // Create a mapping from currentStep (0-based) to actual step number
      const stepMapping = stepNumbers.reduce((acc, stepNum, index) => {
        acc[index] = stepNum;
        return acc;
      }, {});

      // Store the mapping in the steps object for easy access
      steps._stepMapping = stepMapping;
      steps._totalSteps = totalSteps;

      setFormData(steps);
      setFormValues({});
      setCurrentStep(0);
      setFieldErrors({});
    } catch (err) {
      // Only set error if it's not an abort error
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Validate a single field
  const validateField = (field, value) => {
    const errors = [];

    // Required field validation
    if (field.required && (!value || value.trim() === "")) {
      errors.push("This field is required");
    }

    if (value && value.trim() !== "") {
      // Min characters validation
      if (field.minChars && value.length < field.minChars) {
        errors.push(`Minimum ${field.minChars} characters required`);
      }

      // Max characters validation
      if (field.maxChars && value.length > field.maxChars) {
        errors.push(`Maximum ${field.maxChars} characters allowed`);
      }

      // Email validation
      if (field.type.toLowerCase() === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors.push("Please enter a valid email address");
        }
      }

      // Number validation
      if (field.type.toLowerCase() === "number") {
        const numValue = parseInt(value);
        if (isNaN(numValue)) {
          errors.push("Please enter a valid number");
        } else {
          if (field.minChars && numValue < field.minChars) {
            errors.push(`Minimum value is ${field.minChars}`);
          }
          if (field.maxChars && numValue > field.maxChars) {
            errors.push(`Maximum value is ${field.maxChars}`);
          }
        }
      }

      // Phone number validation (basic)
      if (field.type.toLowerCase() === "phone number") {
        const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
        const cleanPhone = value.replace(/[\s\-()]/g, "");
        if (!phoneRegex.test(cleanPhone)) {
          errors.push("Please enter a valid phone number");
        }
      }
    }

    return errors;
  };

  // Validate all fields in current step
  const validateCurrentStep = () => {
    const currentStepNumber = formData ? formData._stepMapping[currentStep] : 1;
    if (!formData || !formData[currentStepNumber]) return true;

    const currentStepFields = formData[currentStepNumber];
    const newErrors = {};

    currentStepFields.forEach((field) => {
      if (shouldShowField(field)) {
        const fieldValue = formValues[field.fieldName] || "";
        const fieldValidationErrors = validateField(field, fieldValue);
        if (fieldValidationErrors.length > 0) {
          newErrors[field.fieldName] = fieldValidationErrors;
        }
      }
    });

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helper function to add CORS proxy if needed
  const getWebhookUrl = (url) => {
    // Check if it's an Airtable webhook URL
    if (url.includes("hooks.airtable.com") && !url.includes("corsproxy.io")) {
      return `https://corsproxy.io/?${url}`;
    }
    return url;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!webhookUrl && devMode !== "true") {
      setError("Please provide a webhook URL to submit form data");
      return;
    }

    // Validate all fields before submission
    if (!validateCurrentStep()) {
      setError("Please fix the validation errors before submitting");
      return;
    }

    if (devMode === "true") {
      setShowJsonPreview(true);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const finalWebhookUrl = getWebhookUrl(webhookUrl);

      // Log if CORS proxy is being used
      if (finalWebhookUrl !== webhookUrl) {
        console.log("CORS proxy applied for Airtable webhook");
      }

      // Generate a unique submission ID
      const submissionId = `sub_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      const response = await fetch(finalWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submissionId,
          formId: formID,
          payload: JSON.stringify(formValues),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      setShowSuccess(true);
      setFormValues({});
      setCurrentStep(0);
      setFieldErrors({});
    } catch (err) {
      // Only set error if it's not an abort error
      if (err.name !== "AbortError") {
        // Check for CORS errors
        if (err.message.includes("CORS") || err.message.includes("cors")) {
          setError(
            "CORS error: Unable to submit to webhook. This may be due to browser security restrictions. Consider using a proxy server."
          );
        } else {
          setError(err.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (fieldName, value) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Clear field error when user starts typing
    if (fieldErrors[fieldName]) {
      setFieldErrors((prev) => ({
        ...prev,
        [fieldName]: [],
      }));
    }
  };

  // Check if field should be shown based on conditions
  const shouldShowField = (field) => {
    if (!field.showIf) return true;

    // Enhanced condition parser
    const conditions = field.showIf.split(/\s+and\s+/i);
    const result = conditions.every((condition) => {
      // Handle different condition formats
      let trimmedCondition = condition.trim();

      // Remove "show if" prefix if present
      if (trimmedCondition.toLowerCase().startsWith("show if ")) {
        trimmedCondition = trimmedCondition.substring(8).trim();
      }

      // Check for equality: field = 'value' or field = "value"
      const equalityMatch = trimmedCondition.match(
        /^(\w+)\s*=\s*['"]([^'"]+)['"]$/
      );
      if (equalityMatch) {
        const [, fieldName, value] = equalityMatch;
        const fieldValue = formValues[fieldName];
        const isEqual = fieldValue === value;
        console.log(
          `Condition: ${trimmedCondition}, Field: ${fieldName}, Value: ${value}, FieldValue: ${fieldValue}, Result: ${isEqual}`
        );
        return isEqual;
      }

      // Check for equality without quotes: field = value
      const equalityNoQuotesMatch =
        trimmedCondition.match(/^(\w+)\s*=\s*(\S+)$/);
      if (equalityNoQuotesMatch) {
        const [, fieldName, value] = equalityNoQuotesMatch;
        const fieldValue = formValues[fieldName];
        const isEqual = fieldValue === value;
        console.log(
          `Condition: ${trimmedCondition}, Field: ${fieldName}, Value: ${value}, FieldValue: ${fieldValue}, Result: ${isEqual}`
        );
        return isEqual;
      }

      // Check for greater than: field > value
      const gtMatch = trimmedCondition.match(/^(\w+)\s*>\s*([\d,]+)$/);
      if (gtMatch) {
        const [, fieldName, value] = gtMatch;
        const fieldValue = parseInt(formValues[fieldName]);
        const numericValue = parseInt(value.replace(/,/g, ""));
        const isGreater = !isNaN(fieldValue) && fieldValue > numericValue;
        console.log(
          `Condition: ${trimmedCondition}, Field: ${fieldName}, Value: ${numericValue}, FieldValue: ${fieldValue}, Result: ${isGreater}`
        );
        return isGreater;
      }

      // Check for less than: field < value
      const ltMatch = trimmedCondition.match(/^(\w+)\s*<\s*([\d,]+)$/);
      if (ltMatch) {
        const [, fieldName, value] = ltMatch;
        const fieldValue = parseInt(formValues[fieldName]);
        const numericValue = parseInt(value.replace(/,/g, ""));
        const isLess = !isNaN(fieldValue) && fieldValue < numericValue;
        console.log(
          `Condition: ${trimmedCondition}, Field: ${fieldName}, Value: ${numericValue}, FieldValue: ${fieldValue}, Result: ${isLess}`
        );
        return isLess;
      }

      // Check for not equals: field != 'value'
      const neMatch = trimmedCondition.match(
        /^(\w+)\s*!=\s*['"]?([^'"]+)['"]?$/
      );
      if (neMatch) {
        const [, fieldName, value] = neMatch;
        const fieldValue = formValues[fieldName];
        const isNotEqual = fieldValue !== value;
        console.log(
          `Condition: ${trimmedCondition}, Field: ${fieldName}, Value: ${value}, FieldValue: ${fieldValue}, Result: ${isNotEqual}`
        );
        return isNotEqual;
      }

      console.log(`Unmatched condition: ${trimmedCondition}, returning true`);
      return true;
    });

    console.log(
      `Field: ${field.fieldName}, ShowIf: ${field.showIf}, Final Result: ${result}`
    );
    return result;
  };

  // Render form field based on type
  const renderField = (field) => {
    if (!shouldShowField(field)) return null;

    const fieldError = fieldErrors[field.fieldName];
    const hasError = fieldError && fieldError.length > 0;

    const commonProps = {
      placeholder: field.placeholder,
      required: field.required,
      value: formValues[field.fieldName] || "",
      onChange: (e) => handleInputChange(field.fieldName, e.target.value),
    };

    const renderFieldContent = () => {
      switch (field.type.toLowerCase()) {
        case "text box":
          return (
            <input
              {...commonProps}
              type="text"
              className={`input input-bordered w-full ${
                hasError ? "input-error" : ""
              }`}
              minLength={field.minChars}
              maxLength={field.maxChars}
            />
          );

        case "email":
          return (
            <input
              {...commonProps}
              type="email"
              className={`input input-bordered w-full ${
                hasError ? "input-error" : ""
              }`}
            />
          );

        case "phone number":
          return (
            <input
              {...commonProps}
              type="tel"
              className={`input input-bordered w-full ${
                hasError ? "input-error" : ""
              }`}
            />
          );

        case "number":
          return (
            <input
              {...commonProps}
              type="number"
              className={`input input-bordered w-full ${
                hasError ? "input-error" : ""
              }`}
              min={field.minChars}
              max={field.maxChars}
            />
          );

        case "dropdown":
          return (
            <select
              {...commonProps}
              className={`select select-bordered w-full ${
                hasError ? "select-error" : ""
              }`}
            >
              <option value="">
                {field.placeholder || "Select an option"}
              </option>
              {field.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          );

        case "textarea":
          return (
            <textarea
              {...commonProps}
              className={`textarea textarea-bordered w-full ${
                hasError ? "textarea-error" : ""
              }`}
              rows={4}
              maxLength={field.maxChars}
            />
          );

        case "rating":
        case "scale":
          const maxRating = field.maxChars || 5;
          const currentRating = parseInt(formValues[field.fieldName]) || 0;

          return (
            <div className="rating">
              {Array.from({ length: maxRating }, (_, index) => {
                const starValue = index + 1;
                return (
                  <input
                    key={starValue}
                    type="radio"
                    name={`rating-${field.fieldName}`}
                    className="mask mask-star-2 bg-orange-400"
                    value={starValue}
                    checked={currentRating === starValue}
                    onChange={() =>
                      handleInputChange(field.fieldName, starValue.toString())
                    }
                  />
                );
              })}
            </div>
          );

        default:
          return (
            <input
              {...commonProps}
              type="text"
              className={`input input-bordered w-full ${
                hasError ? "input-error" : ""
              }`}
            />
          );
      }
    };

    return (
      <div key={field.fieldName} className="form-control w-full">
        <label className="label">
          <span className="label-text">
            {field.label}
            {field.required && <span className="text-error">*</span>}
          </span>
        </label>
        {renderFieldContent()}
        <label className="label">
          <span className="label-text-alt text-error">
            {hasError && fieldError[0]}
          </span>
        </label>
      </div>
    );
  };

  // Ensure component is mounted
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Load form data when formConfig prop changes
  useEffect(() => {
    if (isMounted && formConfig) {
      fetchFormConfig(formConfig);
    }

    // Cleanup function to abort any pending requests when component unmounts or formConfig changes
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [formConfig, fetchFormConfig, isMounted]);

  // Early return if component is not mounted
  if (!isMounted) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <span className="loading loading-spinner loading-lg"></span>
            <p>Initializing form...</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading && !formData) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <span className="loading loading-spinner loading-lg"></span>
            <p>Loading form configuration...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !formData) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
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
              <span>{error}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title">No Form Configuration</h2>
            <p>
              Please provide a valid JSON configuration to generate the form.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show success state
  if (showSuccess) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <div className="success-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 h-16 w-16 text-success"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="card-title">Form Submitted Successfully!</h2>
            <p>Thank you for your submission. We'll get back to you soon.</p>
            <div className="card-actions">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowSuccess(false);
                  setCurrentStep(0);
                  setFormValues({});
                  setFieldErrors({});
                }}
              >
                Submit Another Response
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalSteps = formData ? formData._totalSteps : 0;
  const currentStepNumber = formData ? formData._stepMapping[currentStep] : 1;
  const currentStepData = formData ? formData[currentStepNumber] : [];

  // Handle next step with validation
  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setDirection("next");
      setCurrentStep((prev) => prev + 1);
    } else {
      setError("Please fix the validation errors before proceeding");
    }
  };

  const handlePrevStep = () => {
    setDirection("prev");
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="p-4 md:p-8">
      <div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-2xl mb-4">{formName}</h1>

          {/* Error Display */}
          {error && (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
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
              <span>{error}</span>
            </div>
          )}

          {/* JSON Preview Modal */}
          {showJsonPreview && (
            <dialog id="json_preview_modal" className="modal modal-open">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Form Data Preview</h3>
                <pre className="bg-base-200 p-4 rounded-box mt-4">
                  {JSON.stringify(
                    {
                      submissionId: `sub_${Date.now()}_${Math.random()
                        .toString(36)
                        .substr(2, 9)}`,
                      formId: formID,
                      payload: JSON.stringify(formValues),
                    },
                    null,
                    2
                  )}
                </pre>
                <div className="modal-action">
                  <form method="dialog">
                    <button
                      className="btn"
                      onClick={() => setShowJsonPreview(false)}
                    >
                      Close
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          )}

          {/* Form Display */}
          <div>
            {/* Progress Bar */}
            <div className="my-4">
              <div className="text-sm mb-1">
                Step {currentStepNumber} of {totalSteps}
              </div>
              <progress
                className="progress progress-primary w-full"
                value={currentStep + 1}
                max={totalSteps}
              ></progress>
            </div>

            {/* Form Fields */}
            <div
              key={currentStep}
              className={`space-y-4 mb-8 ${
                animateCards
                  ? direction === "next"
                    ? "animate-slide-in-right"
                    : "animate-slide-in-left"
                  : ""
              }`}
            >
              {currentStepData.map((field) => renderField(field))}
            </div>

            {/* Navigation Buttons */}
            <div className="card-actions justify-between items-center">
              <button
                className="btn btn-outline"
                onClick={handlePrevStep}
                disabled={currentStep === 0}
              >
                Previous
              </button>

              {currentStep < totalSteps - 1 ? (
                <button className="btn btn-primary" onClick={handleNextStep}>
                  Next
                </button>
              ) : (
                <button
                  className="btn btn-success"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : devMode === "true" ? (
                    "Preview JSON"
                  ) : (
                    "Submit Form"
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Dev Mode Indicator */}
          {devMode === "true" && (
            <div role="alert" className="alert alert-info mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>
                Dev Mode: Form data will be previewed instead of submitted
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicFormGenerator;
