# DatePicker
A fully-featured date picker component with a calendar dropdown popup.

## Getting Started

Install dependencies:
```bash
npm install
```

Share the component to your Webflow workspace:
```bash
npx webflow library share
```

For local development:
```bash
npm run dev
```

## Designer Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| ID | Id | — | HTML ID attribute for the date picker container |
| Mode | Variant | single | Date selection mode: single date or date range |
| Date Format | Variant | MM/DD/YYYY | Display format for selected date in input field |
| Size | Variant | md | Size variant for the input field and calendar |
| Label | Text | Select Date | Label text displayed above the input field |
| Placeholder | Text | Choose a date | Placeholder text shown in empty input field |
| Start Placeholder | Text | Start date | Placeholder for start date in range mode |
| End Placeholder | Text | End date | Placeholder for end date in range mode |
| Clear Button Text | Text | Clear date | Accessible label for the clear button |
| Today Button Text | Text | Today | Text for the today quick-select button |
| Previous Month Label | Text | Previous month | Accessible label for previous month button |
| Next Month Label | Text | Next month | Accessible label for next month button |
| Show Label | Visibility | — | Show or hide the label above the input |
| Show Clear Button | Boolean | true | Show clear button to reset selection |
| Show Today Button | Boolean | true | Show today button in calendar footer for quick selection |
| Show Week Numbers | Boolean | false | Display week numbers in the calendar grid |
| Highlight Today | Boolean | true | Visually highlight today's date in the calendar |
| Is Disabled | Boolean | false | Disable the entire date picker input |
| Is Required | Boolean | false | Mark the date picker as a required field |
| Close On Select | Boolean | true | Automatically close calendar after date selection |
| Min Date | Text | — | Minimum selectable date in YYYY-MM-DD format (dates before are disabled) |
| Max Date | Text | — | Maximum selectable date in YYYY-MM-DD format (dates after are disabled) |
| Default Date | Text | — | Default selected date in YYYY-MM-DD format |
| Default Start Date | Text | — | Default start date for range mode in YYYY-MM-DD format |
| Default End Date | Text | — | Default end date for range mode in YYYY-MM-DD format |
| Disabled Days Of Week | Text | — | Comma-separated day numbers to disable (0=Sunday, 6=Saturday) |
| First Day Of Week | Variant | sunday | First day of the week in calendar grid |
| Month Year Format | Variant | MMMM YYYY | Format for month/year display in calendar header |
| Helper Text | Text | — | Helper text displayed below the input field |
| Error Text | Text | — | Error message text displayed when validation fails |
| Show Helper Text | Visibility | — | Show or hide the helper text below input |
| Show Error Text | Visibility | — | Show or hide the error message |
| Name | Text | date | Form input name attribute for form submission |

## Styling

This component automatically adapts to your Webflow site's design system through site variables and inherited properties.

### Site Variables

To match your site's design system, define these CSS variables in your Webflow project settings. The component will use the fallback values shown below until you configure them.

| Site Variable | What It Controls | Fallback |
|---------------|------------------|----------|
| --background-primary | Main background color for input and calendar | #ffffff |
| --background-secondary | Hover states for buttons and days | #f5f5f5 |
| --text-primary | Main text color for labels, input, and calendar | #1a1a1a |
| --text-secondary | Muted text for weekday labels and helper text | #737373 |
| --border-color | Input border, calendar border, and dividers | #e5e5e5 |
| --accent-color | Selected day background, today highlight, focus states | #1a1a1a |
| --accent-text-color | Text color on selected days | #ffffff |
| --border-radius | Corner rounding for input, calendar, and buttons | 8px |

### Inherited Properties

The component inherits these CSS properties from its parent element:
- `font-family` — Typography style
- `color` — Text color
- `line-height` — Text spacing

## Extending in Code

### Custom Date Validation

Add custom validation logic by accessing the component's selected date value:

```javascript
// Listen for date selection changes
const datePicker = document.querySelector('[data-component="date-picker"]');
datePicker.addEventListener('change', (event) => {
  const selectedDate = new Date(event.target.value);
  const dayOfWeek = selectedDate.getDay();
  
  // Example: Prevent weekend selections
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    alert('Please select a weekday');
    event.target.value = '';
  }
});
```

### Integration with Form Libraries

The component works seamlessly with form validation libraries by using the `name` property:

```javascript
// Example with a form submission handler
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const selectedDate = formData.get('date'); // Uses the 'name' prop value
  
  // Process the date value
  console.log('Selected date:', selectedDate);
});
```

## Dependencies

- **react-day-picker** — Flexible date picker component library for React