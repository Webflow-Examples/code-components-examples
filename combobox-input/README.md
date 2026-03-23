# ComboboxInput
A combobox/autocomplete input component that combines a text input field with a filterable dropdown list.

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
| ID | Id | — | HTML ID attribute for the combobox input |
| Size | Variant | md | Visual size of the input field (sm, md, lg) |
| Label | Text | Select an option | Label text displayed above the input |
| Placeholder | Text | Type to search... | Placeholder text shown in the input when empty |
| No Results Message | Text | No results found | Message displayed when no options match the filter |
| Loading Message | Text | Loading options... | Message displayed during loading state |
| Show Label | Visibility | — | Show or hide the label above the input |
| Show Clear Button | Boolean | true | Show clear button when a value is selected |
| Is Loading | Boolean | false | Display loading state in the dropdown |
| Is Disabled | Boolean | false | Disable the entire combobox input |
| Option 1 Label | Text | Option One | Label text for the first option |
| Option 1 Description | Text | Description for option one | Optional description text for the first option |
| Option 1 Value | Text | option-1 | Value returned when first option is selected |
| Option 1 Visible | Visibility | — | Show or hide the first option |
| Option 2 Label | Text | Option Two | Label text for the second option |
| Option 2 Description | Text | Description for option two | Optional description text for the second option |
| Option 2 Value | Text | option-2 | Value returned when second option is selected |
| Option 2 Visible | Visibility | — | Show or hide the second option |
| Option 3 Label | Text | Option Three | Label text for the third option |
| Option 3 Description | Text | Description for option three | Optional description text for the third option |
| Option 3 Value | Text | option-3 | Value returned when third option is selected |
| Option 3 Visible | Visibility | — | Show or hide the third option |
| Option 4 Label | Text | Option Four | Label text for the fourth option |
| Option 4 Description | Text | Description for option four | Optional description text for the fourth option |
| Option 4 Value | Text | option-4 | Value returned when fourth option is selected |
| Option 4 Visible | Visibility | — | Show or hide the fourth option |
| Option 5 Label | Text | Option Five | Label text for the fifth option |
| Option 5 Description | Text | Description for option five | Optional description text for the fifth option |
| Option 5 Value | Text | option-5 | Value returned when fifth option is selected |
| Option 5 Visible | Visibility | — | Show or hide the fifth option |

## Styling

This component automatically adapts to your Webflow site's design system through site variables and inherited properties.

### Site Variables

To match your site's design system, define these CSS variables in your Webflow project settings. The component will use the fallback values shown below until you configure them.

| Site Variable | What It Controls | Fallback |
|---------------|------------------|----------|
| --background-primary | Input field and dropdown background color | #ffffff |
| --background-secondary | Hover and highlighted option states | #f5f5f5 |
| --text-primary | Main text color for input and option labels | #1a1a1a |
| --text-secondary | Description text, placeholder, and icons | #737373 |
| --border-color | Input border, dropdown border, and dividers | #e5e5e5 |
| --accent-color | Selected option background and focus ring | #1a1a1a |
| --accent-text-color | Text color on selected options | #ffffff |
| --border-radius | Rounding for input, dropdown, and buttons | 8px |

### Inherited Properties

The component inherits these CSS properties from its parent element:
- `font-family` — Typography style
- `color` — Text color
- `line-height` — Text spacing

## Extending in Code

### Loading Options from an API

Set the `isLoading` property to `true` while fetching data, then populate options dynamically:

```javascript
// Show loading state
combobox.isLoading = true;

// Fetch options from API
const response = await fetch('/api/options');
const data = await response.json();

// Update options
data.forEach((item, index) => {
  if (index < 5) {
    combobox[`option${index + 1}Label`] = item.name;
    combobox[`option${index + 1}Description`] = item.description;
    combobox[`option${index + 1}Value`] = item.id;
    combobox[`option${index + 1}Visible`] = true;
  }
});

combobox.isLoading = false;
```

### Handling Selection Events

Listen for selection changes to trigger custom actions:

```javascript
const input = document.querySelector('#my-combobox input');
input.addEventListener('change', (e) => {
  const selectedValue = e.target.value;
  console.log('Selected:', selectedValue);
  // Trigger form validation, update other fields, etc.
});
```

## Dependencies

No external dependencies.