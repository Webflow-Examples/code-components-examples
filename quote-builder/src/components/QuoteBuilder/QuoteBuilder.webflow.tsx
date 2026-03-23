import QuoteBuilder from "./QuoteBuilder";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import "./QuoteBuilder.css";

export default declareComponent(QuoteBuilder, {
  name: "QuoteBuilder",
  description: "An interactive pricing calculator with a two-column layout that displays input controls on the left and a live-updating results panel on the right (stacking vertically on mobile). The input section contains labeled number fields with increment/decrement buttons, dropdown selects for option choices, and toggle switches for add-ons. The results panel shows a breakdown of line items with labels, quantities, unit prices, and subtotals, plus a prominent total with configurable currency formatting. All calculations update in real-time as users interact with inputs. The component features a clean card-based design with clear visual separation between input sections and the results panel, and includes a call-to-action button at the bottom for quote requests or contact.",
  group: "Interactive",
  options: {
    ssr: false,
    applyTagSelectors: true
  },
  props: {
    id: props.Id({
      name: "Element ID",
      group: "Settings",
      tooltip: "HTML ID attribute for targeting with CSS or JavaScript"
    }),
    layout: props.Variant({
      name: "Layout",
      options: ["side-by-side", "stacked"],
      defaultValue: "side-by-side",
      group: "Style",
      tooltip: "Results panel position relative to inputs"
    }),
    heading: props.TextNode({
      name: "Heading",
      defaultValue: "Get Your Custom Quote",
      group: "Content",
      tooltip: "Main heading for the calculator"
    }),
    subheading: props.Text({
      name: "Subheading",
      defaultValue: "Customize your package and see pricing in real-time",
      group: "Content",
      tooltip: "Descriptive subheading below main heading"
    }),
    currencySymbol: props.Text({
      name: "Currency Symbol",
      defaultValue: "$",
      group: "Settings",
      tooltip: "Currency symbol to display before prices"
    }),
    inputSectionTitle: props.Text({
      name: "Input Section Title",
      defaultValue: "Configure Your Package",
      group: "Content",
      tooltip: "Title for the input controls section"
    }),
    resultsSectionTitle: props.Text({
      name: "Results Section Title",
      defaultValue: "Your Quote",
      group: "Content",
      tooltip: "Title for the results panel"
    }),
    item1Label: props.Text({
      name: "Item 1 Label",
      defaultValue: "Team Members",
      group: "Item 1",
      tooltip: "Label for first line item"
    }),
    item1Type: props.Variant({
      name: "Item 1 Type",
      options: ["number", "dropdown", "toggle"],
      defaultValue: "number",
      group: "Item 1",
      tooltip: "Input type for first item"
    }),
    item1DefaultValue: props.Number({
      name: "Item 1 Default Value",
      defaultValue: 5,
      group: "Item 1",
      tooltip: "Default quantity or value for first item"
    }),
    item1UnitPrice: props.Number({
      name: "Item 1 Unit Price",
      defaultValue: 25,
      group: "Item 1",
      tooltip: "Price per unit for first item"
    }),
    item1DropdownOptions: props.Text({
      name: "Item 1 Dropdown Options",
      defaultValue: "Basic|1|10\nStandard|2|25\nPremium|3|50",
      group: "Item 1",
      tooltip: "Dropdown options for first item (one per line, format: label|value|price)"
    }),
    item1Visible: props.Visibility({
      name: "Item 1 Visible",
      group: "Item 1",
      tooltip: "Show or hide first line item"
    }),
    item2Label: props.Text({
      name: "Item 2 Label",
      defaultValue: "Storage Space (GB)",
      group: "Item 2",
      tooltip: "Label for second line item"
    }),
    item2Type: props.Variant({
      name: "Item 2 Type",
      options: ["number", "dropdown", "toggle"],
      defaultValue: "dropdown",
      group: "Item 2",
      tooltip: "Input type for second item"
    }),
    item2DefaultValue: props.Number({
      name: "Item 2 Default Value",
      defaultValue: 2,
      group: "Item 2",
      tooltip: "Default quantity or value for second item"
    }),
    item2UnitPrice: props.Number({
      name: "Item 2 Unit Price",
      defaultValue: 15,
      group: "Item 2",
      tooltip: "Price per unit for second item"
    }),
    item2DropdownOptions: props.Text({
      name: "Item 2 Dropdown Options",
      defaultValue: "50GB|1|15\n100GB|2|25\n500GB|3|75",
      group: "Item 2",
      tooltip: "Dropdown options for second item (one per line, format: label|value|price)"
    }),
    item2Visible: props.Visibility({
      name: "Item 2 Visible",
      group: "Item 2",
      tooltip: "Show or hide second line item"
    }),
    item3Label: props.Text({
      name: "Item 3 Label",
      defaultValue: "Priority Support",
      group: "Item 3",
      tooltip: "Label for third line item"
    }),
    item3Type: props.Variant({
      name: "Item 3 Type",
      options: ["number", "dropdown", "toggle"],
      defaultValue: "toggle",
      group: "Item 3",
      tooltip: "Input type for third item"
    }),
    item3DefaultValue: props.Number({
      name: "Item 3 Default Value",
      defaultValue: 0,
      group: "Item 3",
      tooltip: "Default quantity or value for third item (0 or 1 for toggle)"
    }),
    item3UnitPrice: props.Number({
      name: "Item 3 Unit Price",
      defaultValue: 99,
      group: "Item 3",
      tooltip: "Price per unit for third item"
    }),
    item3DropdownOptions: props.Text({
      name: "Item 3 Dropdown Options",
      defaultValue: "None|0|0\nEnabled|1|99",
      group: "Item 3",
      tooltip: "Dropdown options for third item (one per line, format: label|value|price)"
    }),
    item3Visible: props.Visibility({
      name: "Item 3 Visible",
      group: "Item 3",
      tooltip: "Show or hide third line item"
    }),
    item4Label: props.Text({
      name: "Item 4 Label",
      defaultValue: "API Access",
      group: "Item 4",
      tooltip: "Label for fourth line item"
    }),
    item4Type: props.Variant({
      name: "Item 4 Type",
      options: ["number", "dropdown", "toggle"],
      defaultValue: "toggle",
      group: "Item 4",
      tooltip: "Input type for fourth item"
    }),
    item4DefaultValue: props.Number({
      name: "Item 4 Default Value",
      defaultValue: 0,
      group: "Item 4",
      tooltip: "Default quantity or value for fourth item (0 or 1 for toggle)"
    }),
    item4UnitPrice: props.Number({
      name: "Item 4 Unit Price",
      defaultValue: 49,
      group: "Item 4",
      tooltip: "Price per unit for fourth item"
    }),
    item4DropdownOptions: props.Text({
      name: "Item 4 Dropdown Options",
      defaultValue: "None|0|0\nEnabled|1|49",
      group: "Item 4",
      tooltip: "Dropdown options for fourth item (one per line, format: label|value|price)"
    }),
    item4Visible: props.Visibility({
      name: "Item 4 Visible",
      group: "Item 4",
      tooltip: "Show or hide fourth line item"
    }),
    showSubtotals: props.Boolean({
      name: "Show Subtotals",
      defaultValue: true,
      group: "Display",
      tooltip: "Display individual subtotals for each line item in results"
    }),
    showUnitPrices: props.Boolean({
      name: "Show Unit Prices",
      defaultValue: true,
      group: "Display",
      tooltip: "Display unit prices for each line item in results"
    }),
    totalLabel: props.Text({
      name: "Total Label",
      defaultValue: "Total Monthly Cost",
      group: "Content",
      tooltip: "Label for the total amount"
    }),
    ctaText: props.Text({
      name: "CTA Text",
      defaultValue: "Get Your Quote",
      group: "Content",
      tooltip: "Call-to-action button text"
    }),
    ctaLink: props.Link({
      name: "CTA Link",
      group: "Content",
      tooltip: "Call-to-action button link destination"
    }),
    ctaSubtext: props.Text({
      name: "CTA Subtext",
      defaultValue: "No credit card required. Get a detailed quote in minutes.",
      group: "Content",
      tooltip: "Helper text below the CTA button"
    }),
    showCtaSubtext: props.Boolean({
      name: "Show CTA Subtext",
      defaultValue: true,
      group: "Display",
      tooltip: "Display helper text below CTA button"
    }),
  },
});