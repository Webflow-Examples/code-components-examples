import { useState } from "react";

export interface QuoteBuilderProps {
  id?: string;
  layout?: "side-by-side" | "stacked";
  heading?: React.ReactNode;
  subheading?: string;
  currencySymbol?: string;
  inputSectionTitle?: string;
  resultsSectionTitle?: string;
  item1Label?: string;
  item1Type?: "number" | "dropdown" | "toggle";
  item1DefaultValue?: number;
  item1UnitPrice?: number;
  item1DropdownOptions?: string;
  item1Visible?: boolean;
  item2Label?: string;
  item2Type?: "number" | "dropdown" | "toggle";
  item2DefaultValue?: number;
  item2UnitPrice?: number;
  item2DropdownOptions?: string;
  item2Visible?: boolean;
  item3Label?: string;
  item3Type?: "number" | "dropdown" | "toggle";
  item3DefaultValue?: number;
  item3UnitPrice?: number;
  item3DropdownOptions?: string;
  item3Visible?: boolean;
  item4Label?: string;
  item4Type?: "number" | "dropdown" | "toggle";
  item4DefaultValue?: number;
  item4UnitPrice?: number;
  item4DropdownOptions?: string;
  item4Visible?: boolean;
  showSubtotals?: boolean;
  showUnitPrices?: boolean;
  totalLabel?: string;
  ctaText?: string;
  ctaLink?: string;
  ctaSubtext?: string;
  showCtaSubtext?: boolean;
}

interface DropdownOption {
  label: string;
  value: number;
  price: number;
}

interface LineItem {
  label: string;
  type: "number" | "dropdown" | "toggle";
  defaultValue: number;
  unitPrice: number;
  dropdownOptions: string;
  visible: boolean;
}

export default function QuoteBuilder({
  id,
  layout = "side-by-side",
  heading = "Get Your Custom Quote",
  subheading = "Customize your package and see pricing in real-time",
  currencySymbol = "$",
  inputSectionTitle = "Configure Your Package",
  resultsSectionTitle = "Your Quote",
  item1Label = "Team Members",
  item1Type = "number",
  item1DefaultValue = 5,
  item1UnitPrice = 25,
  item1DropdownOptions = "Basic|1|10\nStandard|2|25\nPremium|3|50",
  item1Visible = true,
  item2Label = "Storage Space (GB)",
  item2Type = "dropdown",
  item2DefaultValue = 2,
  item2UnitPrice = 15,
  item2DropdownOptions = "50GB|1|15\n100GB|2|25\n500GB|3|75",
  item2Visible = true,
  item3Label = "Priority Support",
  item3Type = "toggle",
  item3DefaultValue = 0,
  item3UnitPrice = 99,
  item3DropdownOptions = "None|0|0\nEnabled|1|99",
  item3Visible = true,
  item4Label = "API Access",
  item4Type = "toggle",
  item4DefaultValue = 0,
  item4UnitPrice = 49,
  item4DropdownOptions = "None|0|0\nEnabled|1|49",
  item4Visible = true,
  showSubtotals = true,
  showUnitPrices = true,
  totalLabel = "Total Monthly Cost",
  ctaText = "Get Your Quote",
  ctaLink = "#",
  ctaSubtext = "No credit card required. Get a detailed quote in minutes.",
  showCtaSubtext = true,
}: QuoteBuilderProps) {
  const items: LineItem[] = [
    {
      label: item1Label,
      type: item1Type,
      defaultValue: item1DefaultValue,
      unitPrice: item1UnitPrice,
      dropdownOptions: item1DropdownOptions,
      visible: item1Visible,
    },
    {
      label: item2Label,
      type: item2Type,
      defaultValue: item2DefaultValue,
      unitPrice: item2UnitPrice,
      dropdownOptions: item2DropdownOptions,
      visible: item2Visible,
    },
    {
      label: item3Label,
      type: item3Type,
      defaultValue: item3DefaultValue,
      unitPrice: item3UnitPrice,
      dropdownOptions: item3DropdownOptions,
      visible: item3Visible,
    },
    {
      label: item4Label,
      type: item4Type,
      defaultValue: item4DefaultValue,
      unitPrice: item4UnitPrice,
      dropdownOptions: item4DropdownOptions,
      visible: item4Visible,
    },
  ];

  const [values, setValues] = useState<number[]>(
    items.map((item) => item.defaultValue)
  );

  const parseDropdownOptions = (optionsText: string): DropdownOption[] => {
    return optionsText
      .split(/\\n|\n/)
      .filter((line) => line.trim())
      .map((line) => {
        const parts = line.split("|");
        return {
          label: parts[0]?.trim() || "",
          value: parseFloat(parts[1]?.trim() || "0"),
          price: parseFloat(parts[2]?.trim() || "0"),
        };
      });
  };

  const handleValueChange = (index: number, newValue: number) => {
    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);
  };

  const calculateSubtotal = (index: number): number => {
    const item = items[index];
    const value = values[index];

    if (item.type === "dropdown") {
      const options = parseDropdownOptions(item.dropdownOptions);
      const selectedOption = options.find((opt) => opt.value === value);
      return selectedOption?.price || 0;
    }

    return value * item.unitPrice;
  };

  const calculateTotal = (): number => {
    return items.reduce((total, item, index) => {
      if (!item.visible) return total;
      return total + calculateSubtotal(index);
    }, 0);
  };

  const formatPrice = (price: number): string => {
    return `${currencySymbol}${price.toFixed(2)}`;
  };

  const renderInput = (item: LineItem, index: number) => {
    const value = values[index];

    if (item.type === "number") {
      return (
        <div className="wf-quotebuilder-number-input">
          <button
            type="button"
            className="wf-quotebuilder-decrement"
            onClick={() => handleValueChange(index, Math.max(0, value - 1))}
            aria-label="Decrease"
          >
            −
          </button>
          <input
            type="number"
            className="wf-quotebuilder-number-field"
            value={value}
            onChange={(e) =>
              handleValueChange(index, Math.max(0, parseFloat(e.target.value) || 0))
            }
            min="0"
          />
          <button
            type="button"
            className="wf-quotebuilder-increment"
            onClick={() => handleValueChange(index, value + 1)}
            aria-label="Increase"
          >
            +
          </button>
        </div>
      );
    }

    if (item.type === "dropdown") {
      const options = parseDropdownOptions(item.dropdownOptions);
      return (
        <select
          className="wf-quotebuilder-select"
          value={value}
          onChange={(e) =>
            handleValueChange(index, parseFloat(e.target.value))
          }
        >
          {options.map((option, optIndex) => (
            <option key={optIndex} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (item.type === "toggle") {
      return (
        <label className="wf-quotebuilder-toggle">
          <input
            type="checkbox"
            className="wf-quotebuilder-toggle-input"
            checked={value === 1}
            onChange={(e) => handleValueChange(index, e.target.checked ? 1 : 0)}
          />
          <span className="wf-quotebuilder-toggle-slider"></span>
        </label>
      );
    }

    return null;
  };

  const visibleItems = items.filter((item) => item.visible);
  const total = calculateTotal();

  return (
    <div
      id={id}
      className={`wf-quotebuilder wf-quotebuilder-layout-${layout}`}
    >
      <div className="wf-quotebuilder-header">
        <h2 className="wf-quotebuilder-heading">{heading}</h2>
        {subheading && (
          <p className="wf-quotebuilder-subheading">{subheading}</p>
        )}
      </div>

      <div className="wf-quotebuilder-container">
        <div className="wf-quotebuilder-inputs">
          <h3 className="wf-quotebuilder-section-title">{inputSectionTitle}</h3>
          <div className="wf-quotebuilder-inputs-list">
            {items.map(
              (item, index) =>
                item.visible && (
                  <div key={index} className="wf-quotebuilder-input-row">
                    <label className="wf-quotebuilder-label">
                      {item.label}
                    </label>
                    {renderInput(item, index)}
                  </div>
                )
            )}
          </div>
        </div>

        <div className="wf-quotebuilder-results">
          <h3 className="wf-quotebuilder-section-title">
            {resultsSectionTitle}
          </h3>
          <div className="wf-quotebuilder-results-list">
            {visibleItems.map((item, visibleIndex) => {
              const actualIndex = items.findIndex((i) => i === item);
              const value = values[actualIndex];
              const subtotal = calculateSubtotal(actualIndex);

              if (item.type === "toggle" && value === 0) {
                return null;
              }

              return (
                <div key={actualIndex} className="wf-quotebuilder-result-item">
                  <div className="wf-quotebuilder-result-label">
                    {item.label}
                  </div>
                  <div className="wf-quotebuilder-result-details">
                    {item.type === "number" && (
                      <span className="wf-quotebuilder-result-quantity">
                        {value} ×{" "}
                        {showUnitPrices && (
                          <span className="wf-quotebuilder-result-unit-price">
                            {formatPrice(item.unitPrice)}
                          </span>
                        )}
                      </span>
                    )}
                    {showSubtotals && (
                      <span className="wf-quotebuilder-result-subtotal">
                        {formatPrice(subtotal)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="wf-quotebuilder-total">
            <span className="wf-quotebuilder-total-label">{totalLabel}</span>
            <span className="wf-quotebuilder-total-amount">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      <div className="wf-quotebuilder-footer">
        <a href={ctaLink} className="wf-quotebuilder-cta">
          {ctaText}
        </a>
        {showCtaSubtext && ctaSubtext && (
          <p className="wf-quotebuilder-cta-subtext">{ctaSubtext}</p>
        )}
      </div>
    </div>
  );
}