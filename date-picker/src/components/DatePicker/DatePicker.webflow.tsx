import DatePicker from "./DatePicker";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import "./DatePicker.css";

export default declareComponent(DatePicker, {
  name: "DatePicker",
  description: "A fully-featured date picker component with a calendar dropdown popup. Clicking the input field opens a calendar showing the current month in a grid layout with day names. Users can navigate between months using previous/next arrow buttons and select dates by clicking. The selected date displays in the input field in a configurable format. Supports single date selection or date range mode where users select start and end dates with visual highlighting of the range. Today's date is highlighted with a distinct visual style. Dates outside configurable min/max boundaries are disabled and grayed out. The input includes a calendar icon and a clear button to reset the selection. Fully keyboard navigable for accessibility with arrow keys for date navigation and Enter to select.",
  group: "Forms",
  options: {
    ssr: false,
    applyTagSelectors: true
  },
  props: {
    id: props.Id({
      name: "Element ID",
      group: "Settings",
      tooltip: "HTML ID attribute for the date picker container"
    }),
    mode: props.Variant({
      name: "Selection Mode",
      options: ["single", "range"],
      defaultValue: "single",
      group: "Behavior",
      tooltip: "Date selection mode: single date or date range"
    }),
    dateFormat: props.Variant({
      name: "Date Format",
      options: ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"],
      defaultValue: "MM/DD/YYYY",
      group: "Style",
      tooltip: "Display format for selected date in input field"
    }),
    size: props.Variant({
      name: "Size",
      options: ["sm", "md", "lg"],
      defaultValue: "md",
      group: "Style",
      tooltip: "Size variant for the input field and calendar"
    }),
    label: props.Text({
      name: "Label",
      defaultValue: "Select Date",
      group: "Content",
      tooltip: "Label text displayed above the input field"
    }),
    placeholder: props.Text({
      name: "Placeholder",
      defaultValue: "Choose a date",
      group: "Content",
      tooltip: "Placeholder text shown in empty input field"
    }),
    startPlaceholder: props.Text({
      name: "Start Placeholder",
      defaultValue: "Start date",
      group: "Content",
      tooltip: "Placeholder for start date in range mode"
    }),
    endPlaceholder: props.Text({
      name: "End Placeholder",
      defaultValue: "End date",
      group: "Content",
      tooltip: "Placeholder for end date in range mode"
    }),
    clearButtonText: props.Text({
      name: "Clear Button Text",
      defaultValue: "Clear date",
      group: "Content",
      tooltip: "Accessible label for the clear button"
    }),
    todayButtonText: props.Text({
      name: "Today Button Text",
      defaultValue: "Today",
      group: "Content",
      tooltip: "Text for the today quick-select button"
    }),
    previousMonthLabel: props.Text({
      name: "Previous Month Label",
      defaultValue: "Previous month",
      group: "Content",
      tooltip: "Accessible label for previous month button"
    }),
    nextMonthLabel: props.Text({
      name: "Next Month Label",
      defaultValue: "Next month",
      group: "Content",
      tooltip: "Accessible label for next month button"
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
      tooltip: "Show clear button to reset selection"
    }),
    showTodayButton: props.Boolean({
      name: "Show Today Button",
      defaultValue: true,
      group: "Display",
      tooltip: "Show today button in calendar footer for quick selection"
    }),
    showWeekNumbers: props.Boolean({
      name: "Show Week Numbers",
      defaultValue: false,
      group: "Display",
      tooltip: "Display week numbers in the calendar grid"
    }),
    highlightToday: props.Boolean({
      name: "Highlight Today",
      defaultValue: true,
      group: "Display",
      tooltip: "Visually highlight today's date in the calendar"
    }),
    isDisabled: props.Boolean({
      name: "Disabled",
      defaultValue: false,
      group: "Behavior",
      tooltip: "Disable the entire date picker input"
    }),
    isRequired: props.Boolean({
      name: "Required",
      defaultValue: false,
      group: "Behavior",
      tooltip: "Mark the date picker as a required field"
    }),
    closeOnSelect: props.Boolean({
      name: "Close On Select",
      defaultValue: true,
      group: "Behavior",
      tooltip: "Automatically close calendar after date selection"
    }),
    minDate: props.Text({
      name: "Minimum Date",
      defaultValue: "",
      group: "Date Constraints",
      tooltip: "Minimum selectable date in YYYY-MM-DD format (dates before are disabled)"
    }),
    maxDate: props.Text({
      name: "Maximum Date",
      defaultValue: "",
      group: "Date Constraints",
      tooltip: "Maximum selectable date in YYYY-MM-DD format (dates after are disabled)"
    }),
    defaultDate: props.Text({
      name: "Default Date",
      defaultValue: "",
      group: "Date Constraints",
      tooltip: "Default selected date in YYYY-MM-DD format"
    }),
    defaultStartDate: props.Text({
      name: "Default Start Date",
      defaultValue: "",
      group: "Date Constraints",
      tooltip: "Default start date for range mode in YYYY-MM-DD format"
    }),
    defaultEndDate: props.Text({
      name: "Default End Date",
      defaultValue: "",
      group: "Date Constraints",
      tooltip: "Default end date for range mode in YYYY-MM-DD format"
    }),
    disabledDaysOfWeek: props.Text({
      name: "Disabled Days of Week",
      defaultValue: "",
      group: "Date Constraints",
      tooltip: "Comma-separated day numbers to disable (0=Sunday, 6=Saturday)"
    }),
    firstDayOfWeek: props.Variant({
      name: "First Day of Week",
      options: ["sunday", "monday"],
      defaultValue: "sunday",
      group: "Style",
      tooltip: "First day of the week in calendar grid"
    }),
    monthYearFormat: props.Variant({
      name: "Month Year Format",
      options: ["MMMM YYYY", "MMM YYYY", "MM/YYYY"],
      defaultValue: "MMMM YYYY",
      group: "Style",
      tooltip: "Format for month/year display in calendar header"
    }),
    helperText: props.Text({
      name: "Helper Text",
      defaultValue: "",
      group: "Content",
      tooltip: "Helper text displayed below the input field"
    }),
    errorText: props.Text({
      name: "Error Text",
      defaultValue: "",
      group: "Content",
      tooltip: "Error message text displayed when validation fails"
    }),
    showHelperText: props.Visibility({
      name: "Show Helper Text",
      group: "Display",
      tooltip: "Show or hide the helper text below input"
    }),
    showErrorText: props.Visibility({
      name: "Show Error Text",
      group: "Display",
      tooltip: "Show or hide the error message"
    }),
    name: props.Text({
      name: "Input Name",
      defaultValue: "date",
      group: "Settings",
      tooltip: "Form input name attribute for form submission"
    })
  }
});