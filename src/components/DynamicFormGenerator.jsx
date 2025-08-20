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
              className={`field-input ${hasError ? "error" : ""}`}
              minLength={field.minChars}
              maxLength={field.maxChars}
            />
          );

        case "email":
          return (
            <input
              {...commonProps}
              type="email"
              className={`field-input ${hasError ? "error" : ""}`}
            />
          );

        case "phone number":
          return (
            <input
              {...commonProps}
              type="tel"
              className={`field-input ${hasError ? "error" : ""}`}
            />
          );

        case "number":
          return (
            <input
              {...commonProps}
              type="number"
              className={`field-input ${hasError ? "error" : ""}`}
              min={field.minChars}
              max={field.maxChars}
            />
          );

        case "dropdown":
          return (
            <select
              {...commonProps}
              className={`field-select ${hasError ? "error" : ""}`}
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
              className={`field-textarea ${hasError ? "error" : ""}`}
              rows={4}
              maxLength={field.maxChars}
            />
          );

        case "rating":
        case "scale":
          const minRating = field.minChars || 1;
          const maxRating = field.maxChars || 5;
          const currentRating = parseInt(formValues[field.fieldName]) || 0;

          return (
            <div className="rating-container">
              {Array.from({ length: maxRating }, (_, index) => {
                const starValue = index + 1;
                const isSelected = starValue <= currentRating;

                return (
                  <button
                    key={starValue}
                    type="button"
                    className={`rating-star ${isSelected ? "active" : ""}`}
                    aria-label={`${starValue} star`}
                    onClick={() =>
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
              className={`field-input ${hasError ? "error" : ""}`}
            />
          );
      }
    };

    return (
      <div key={field.fieldName} className="form-field">
        <label className="field-label">
          {field.label}
          {field.required && <span className="required">*</span>}
        </label>
        {renderFieldContent()}
        <div className="error-message">{hasError && fieldError[0]}</div>
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
      <div className="loading-container">
        <div className="loading-card">
          <div className="loading-spinner-large"></div>
          <p>Initializing form...</p>
        </div>
      </div>
    );
  }

  if (loading && !formData) {
    return (
      <div className="loading-container">
        <div className="loading-card">
          <div className="loading-spinner-large"></div>
          <p>Loading form configuration...</p>
        </div>
      </div>
    );
  }

  if (error && !formData) {
    return (
      <div className="loading-container">
        <div className="loading-card">
          <div className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="alert-icon"
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
    );
  }

  if (!formData) {
    return (
      <div className="loading-container">
        <div className="loading-card">
          <h2 className="form-title">No Form Configuration</h2>
          <p>Please provide a valid JSON configuration to generate the form.</p>
        </div>
      </div>
    );
  }

  // Show success state
  if (showSuccess) {
    return (
      <div className="dynamic-form-container">
        <div className="form-card">
          <div className="success-container">
            <div className="success-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="success-check"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="form-title">Form Submitted Successfully!</h2>
            <p className="success-message">
              Thank you for your submission. We'll get back to you soon.
            </p>
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
    );
  }

  const totalSteps = formData ? formData._totalSteps : 0;
  const currentStepNumber = formData ? formData._stepMapping[currentStep] : 1;
  const currentStepData = formData ? formData[currentStepNumber] : [];

  // Handle next step with validation
  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setError("Please fix the validation errors before proceeding");
    }
  };

  return (
    <div className="dynamic-form-container">
      <div className="form-card">
        <h1 className="form-title">{formName}</h1>

        {/* Error Display */}
        {error && (
          <div className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="alert-icon"
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
          <div className="modal">
            <div className="modal-box">
              <h3 className="modal-title">Form Data Preview</h3>
              <pre className="modal-content">
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
                <button
                  className="btn btn-primary"
                  onClick={() => setShowJsonPreview(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form Display */}
        <div>
          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-text">
              Step {currentStepNumber} of {totalSteps}
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Fields */}
          <div style={{ marginBottom: "2rem" }}>
            {currentStepData.map((field) => renderField(field))}
          </div>

          {/* Navigation Buttons */}
          <div className="button-container">
            <button
              className="btn btn-outline"
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
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
                  <div className="loading-spinner"></div>
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
          <div className="alert alert-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="alert-icon"
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
  );
};

export default DynamicFormGenerator;
