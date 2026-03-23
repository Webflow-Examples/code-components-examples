import { useState } from "react";

export interface ToggleSwitchProps {
  id?: string;
  size?: "small" | "medium" | "large";
  labelPosition?: "left" | "right";
  label?: React.ReactNode;
  description?: string;
  defaultChecked?: boolean;
  isDisabled?: boolean;
  showIcons?: boolean;
  showDescription?: boolean;
}

export default function ToggleSwitch({
  id,
  size = "medium",
  labelPosition = "left",
  label = "Enable notifications",
  description = "Receive email updates about your account",
  defaultChecked = false,
  isDisabled = false,
  showIcons = false,
  showDescription = true,
}: ToggleSwitchProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleToggle = () => {
    if (!isDisabled) {
      setIsChecked(!isChecked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      id={id}
      className={`wf-toggleswitch wf-toggleswitch--size-${size} wf-toggleswitch--label-${labelPosition} ${
        isDisabled ? "wf-toggleswitch--disabled" : ""
      } ${isChecked ? "wf-toggleswitch--checked" : ""}`}
    >
      {labelPosition === "left" && (
        <div className="wf-toggleswitch-label-wrapper">
          <div className="wf-toggleswitch-label">{label}</div>
          {showDescription && description && (
            <div className="wf-toggleswitch-description">{description}</div>
          )}
        </div>
      )}

      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        className="wf-toggleswitch-button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <span className="wf-toggleswitch-track">
          <span className="wf-toggleswitch-thumb">
            {showIcons && (
              <span className="wf-toggleswitch-icon">
                {isChecked ? (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 3L3 9M3 3L9 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            )}
          </span>
        </span>
      </button>

      {labelPosition === "right" && (
        <div className="wf-toggleswitch-label-wrapper">
          <div className="wf-toggleswitch-label">{label}</div>
          {showDescription && description && (
            <div className="wf-toggleswitch-description">{description}</div>
          )}
        </div>
      )}
    </div>
  );
}