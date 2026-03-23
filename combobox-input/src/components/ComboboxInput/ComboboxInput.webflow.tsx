import ComboboxInput from "./ComboboxInput";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import "./ComboboxInput.css";

export default declareComponent(ComboboxInput, {
  name: "ComboboxInput",
  description: "A combobox/autocomplete input component that combines a text input field with a filterable dropdown list. As the user types, options are dynamically filtered to match the input text. Supports single selection with the selected value displayed in the input field. Each option can display a label and an optional description beneath it. The dropdown opens automatically on focus showing all available options, then filters as the user types. Includes full keyboard navigation with arrow keys for moving through options, Enter to select, and Escape to close the dropdown. Features a clear button to reset the selection, a loading state for async data fetching, and a customizable no-results message when filtering returns no matches. The component is fully responsive and accessible.",
  group: "Forms",
  options: {
    ssr: false,
    applyTagSelectors: true
  },
  props: {
    id: props.Id({
      name: "Element ID",
      group: "Settings",
      tooltip: "HTML ID attribute for the combobox input"
    }),
    size: props.Variant({
      name: "Size",
      options: ["sm", "md", "lg"],
      defaultValue: "md",
      group: "Style",
      tooltip: "Visual size of the input field"
    }),
    label: props.Text({
      name: "Label",
      defaultValue: "Select an option",
      group: "Content",
      tooltip: "Label text displayed above the input"
    }),
    placeholder: props.Text({
      name: "Placeholder",
      defaultValue: "Type to search...",
      group: "Content",
      tooltip: "Placeholder text shown in the input when empty"
    }),
    noResultsMessage: props.Text({
      name: "No Results Message",
      defaultValue: "No results found",
      group: "Content",
      tooltip: "Message displayed when no options match the filter"
    }),
    loadingMessage: props.Text({
      name: "Loading Message",
      defaultValue: "Loading options...",
      group: "Content",
      tooltip: "Message displayed during loading state"
    }),
    showLabel: props.Visibility({
      name: "Show Label",
      group: "Display",
      tooltip: "Show or hide the label above the input"
    }),
    showClearButton: props.Boolean({
      name: "Show Clear Button",
      defaultValue: true,
      group: "Display",
      tooltip: "Show clear button when a value is selected"
    }),
    isLoading: props.Boolean({
      name: "Loading State",
      defaultValue: false,
      group: "Behavior",
      tooltip: "Display loading state in the dropdown"
    }),
    isDisabled: props.Boolean({
      name: "Disabled",
      defaultValue: false,
      group: "Behavior",
      tooltip: "Disable the entire combobox input"
    }),
    option1Label: props.Text({
      name: "Label",
      defaultValue: "Option One",
      group: "Option 1",
      tooltip: "Label text for the first option"
    }),
    option1Description: props.Text({
      name: "Description",
      defaultValue: "Description for option one",
      group: "Option 1",
      tooltip: "Optional description text for the first option"
    }),
    option1Value: props.Text({
      name: "Value",
      defaultValue: "option-1",
      group: "Option 1",
      tooltip: "Value returned when first option is selected"
    }),
    option1Visible: props.Visibility({
      name: "Visible",
      group: "Option 1",
      tooltip: "Show or hide the first option"
    }),
    option2Label: props.Text({
      name: "Label",
      defaultValue: "Option Two",
      group: "Option 2",
      tooltip: "Label text for the second option"
    }),
    option2Description: props.Text({
      name: "Description",
      defaultValue: "Description for option two",
      group: "Option 2",
      tooltip: "Optional description text for the second option"
    }),
    option2Value: props.Text({
      name: "Value",
      defaultValue: "option-2",
      group: "Option 2",
      tooltip: "Value returned when second option is selected"
    }),
    option2Visible: props.Visibility({
      name: "Visible",
      group: "Option 2",
      tooltip: "Show or hide the second option"
    }),
    option3Label: props.Text({
      name: "Label",
      defaultValue: "Option Three",
      group: "Option 3",
      tooltip: "Label text for the third option"
    }),
    option3Description: props.Text({
      name: "Description",
      defaultValue: "Description for option three",
      group: "Option 3",
      tooltip: "Optional description text for the third option"
    }),
    option3Value: props.Text({
      name: "Value",
      defaultValue: "option-3",
      group: "Option 3",
      tooltip: "Value returned when third option is selected"
    }),
    option3Visible: props.Visibility({
      name: "Visible",
      group: "Option 3",
      tooltip: "Show or hide the third option"
    }),
    option4Label: props.Text({
      name: "Label",
      defaultValue: "Option Four",
      group: "Option 4",
      tooltip: "Label text for the fourth option"
    }),
    option4Description: props.Text({
      name: "Description",
      defaultValue: "Description for option four",
      group: "Option 4",
      tooltip: "Optional description text for the fourth option"
    }),
    option4Value: props.Text({
      name: "Value",
      defaultValue: "option-4",
      group: "Option 4",
      tooltip: "Value returned when fourth option is selected"
    }),
    option4Visible: props.Visibility({
      name: "Visible",
      group: "Option 4",
      tooltip: "Show or hide the fourth option"
    }),
    option5Label: props.Text({
      name: "Label",
      defaultValue: "Option Five",
      group: "Option 5",
      tooltip: "Label text for the fifth option"
    }),
    option5Description: props.Text({
      name: "Description",
      defaultValue: "Description for option five",
      group: "Option 5",
      tooltip: "Optional description text for the fifth option"
    }),
    option5Value: props.Text({
      name: "Value",
      defaultValue: "option-5",
      group: "Option 5",
      tooltip: "Value returned when fifth option is selected"
    }),
    option5Visible: props.Visibility({
      name: "Visible",
      group: "Option 5",
      tooltip: "Show or hide the fifth option"
    }),
  },
});