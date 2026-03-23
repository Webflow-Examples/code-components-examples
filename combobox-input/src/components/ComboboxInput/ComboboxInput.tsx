import { useState, useRef, useEffect } from "react";

export interface ComboboxInputProps {
  id?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
  placeholder?: string;
  noResultsMessage?: string;
  loadingMessage?: string;
  showLabel?: boolean;
  showClearButton?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  option1Label?: string;
  option1Description?: string;
  option1Value?: string;
  option1Visible?: boolean;
  option2Label?: string;
  option2Description?: string;
  option2Value?: string;
  option2Visible?: boolean;
  option3Label?: string;
  option3Description?: string;
  option3Value?: string;
  option3Visible?: boolean;
  option4Label?: string;
  option4Description?: string;
  option4Value?: string;
  option4Visible?: boolean;
  option5Label?: string;
  option5Description?: string;
  option5Value?: string;
  option5Visible?: boolean;
}

interface Option {
  label: string;
  description: string;
  value: string;
}

const sizeMap = {
  sm: "32px",
  md: "40px",
  lg: "48px",
};

export default function ComboboxInput({
  id,
  size = "md",
  label = "Select an option",
  placeholder = "Type to search...",
  noResultsMessage = "No results found",
  loadingMessage = "Loading options...",
  showLabel = true,
  showClearButton = true,
  isLoading = false,
  isDisabled = false,
  option1Label = "Option One",
  option1Description = "Description for option one",
  option1Value = "option-1",
  option1Visible = true,
  option2Label = "Option Two",
  option2Description = "Description for option two",
  option2Value = "option-2",
  option2Visible = true,
  option3Label = "Option Three",
  option3Description = "Description for option three",
  option3Value = "option-3",
  option3Visible = true,
  option4Label = "Option Four",
  option4Description = "Description for option four",
  option4Value = "option-4",
  option4Visible = true,
  option5Label = "Option Five",
  option5Description = "Description for option five",
  option5Value = "option-5",
  option5Visible = true,
}: ComboboxInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const allOptions: Option[] = [
    { label: option1Label, description: option1Description, value: option1Value },
    { label: option2Label, description: option2Description, value: option2Value },
    { label: option3Label, description: option3Description, value: option3Value },
    { label: option4Label, description: option4Description, value: option4Value },
    { label: option5Label, description: option5Description, value: option5Value },
  ];

  const visibleFlags = [
    option1Visible,
    option2Visible,
    option3Visible,
    option4Visible,
    option5Visible,
  ];

  const options = allOptions.filter((_, index) => visibleFlags[index]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const inputHeight = sizeMap[size];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && filteredOptions.length > 0) {
      setHighlightedIndex(0);
    }
  }, [inputValue, isOpen, filteredOptions.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelectedValue(null);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleOptionClick = (option: Option) => {
    setInputValue(option.label);
    setSelectedValue(option.value);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setInputValue("");
    setSelectedValue(null);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setIsOpen(true);
      return;
    }

    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (filteredOptions[highlightedIndex]) {
          handleOptionClick(filteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const highlightedElement = dropdownRef.current.querySelector(
        `[data-index="${highlightedIndex}"]`
      );
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex, isOpen]);

  return (
    <div
      id={id}
      className="wf-comboboxinput"
      ref={containerRef}
      style={{ "--wf-comboboxinput-height": inputHeight } as React.CSSProperties}
    >
      {showLabel && (
        <label htmlFor={`${id}-input`} className="wf-comboboxinput-label">
          {label}
        </label>
      )}
      <div className="wf-comboboxinput-wrapper">
        <input
          id={`${id}-input`}
          ref={inputRef}
          type="text"
          className="wf-comboboxinput-input"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isDisabled}
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls={`${id}-dropdown`}
          role="combobox"
        />
        {showClearButton && inputValue && !isDisabled && (
          <button
            type="button"
            className="wf-comboboxinput-clear"
            onClick={handleClear}
            aria-label="Clear selection"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <div className="wf-comboboxinput-icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {isOpen && !isDisabled && (
        <div
          id={`${id}-dropdown`}
          ref={dropdownRef}
          className="wf-comboboxinput-dropdown"
          role="listbox"
        >
          {isLoading ? (
            <div className="wf-comboboxinput-message">{loadingMessage}</div>
          ) : filteredOptions.length === 0 ? (
            <div className="wf-comboboxinput-message">{noResultsMessage}</div>
          ) : (
            filteredOptions.map((option, index) => (
              <div
                key={option.value}
                data-index={index}
                className={`wf-comboboxinput-option ${
                  index === highlightedIndex
                    ? "wf-comboboxinput-option-highlighted"
                    : ""
                } ${
                  selectedValue === option.value
                    ? "wf-comboboxinput-option-selected"
                    : ""
                }`}
                onClick={() => handleOptionClick(option)}
                role="option"
                aria-selected={selectedValue === option.value}
              >
                <div className="wf-comboboxinput-option-label">
                  {option.label}
                </div>
                {option.description && (
                  <div className="wf-comboboxinput-option-description">
                    {option.description}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}