# QuoteBuilder

An interactive pricing calculator with real-time updates, featuring a two-column layout with input controls and a live results panel.

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
| ID | Id | — | HTML ID attribute for targeting in custom code |
| Layout | Variant | side-by-side | Results panel position relative to inputs (side-by-side, stacked) |
| Heading | TextNode | Get Your Custom Quote | Main heading for the calculator |
| Subheading | Text | Customize your package and see pricing in real-time | Descriptive subheading below main heading |
| Currency Symbol | Text | $ | Currency symbol to display before prices |
| Input Section Title | Text | Configure Your Package | Title for the input controls section |
| Results Section Title | Text | Your Quote | Title for the results panel |
| Item 1 Label | Text | Team Members | Label for first line item |
| Item 1 Type | Variant | number | Input type for first item (number, dropdown, toggle) |
| Item 1 Default Value | Number | 5 | Default quantity or value for first item |
| Item 1 Unit Price | Number | 25 | Price per unit for first item |
| Item 1 Dropdown Options | Text | Basic\|1\|10<br>Standard\|2\|25<br>Premium\|3\|50 | Dropdown options for first item (one per line, format: label\|value\|price) |
| Item 1 Visible | Visibility | — | Show or hide first line item |
| Item 2 Label | Text | Storage Space (GB) | Label for second line item |
| Item 2 Type | Variant | dropdown | Input type for second item (number, dropdown, toggle) |
| Item 2 Default Value | Number | 2 | Default quantity or value for second item |
| Item 2 Unit Price | Number | 15 | Price per unit for second item |
| Item 2 Dropdown Options | Text | 50GB\|1\|15<br>100GB\|2\|25<br>500GB\|3\|75 | Dropdown options for second item (one per line, format: label\|value\|price) |
| Item 2 Visible | Visibility | — | Show or hide second line item |
| Item 3 Label | Text | Priority Support | Label for third line item |
| Item 3 Type | Variant | toggle | Input type for third item (number, dropdown, toggle) |
| Item 3 Default Value | Number | 0 | Default quantity or value for third item (0 or 1 for toggle) |
| Item 3 Unit Price | Number | 99 | Price per unit for third item |
| Item 3 Dropdown Options | Text | None\|0\|0<br>Enabled\|1\|99 | Dropdown options for third item (one per line, format: label\|value\|price) |
| Item 3 Visible | Visibility | — | Show or hide third line item |
| Item 4 Label | Text | API Access | Label for fourth line item |
| Item 4 Type | Variant | toggle | Input type for fourth item (number, dropdown, toggle) |
| Item 4 Default Value | Number | 0 | Default quantity or value for fourth item (0 or 1 for toggle) |
| Item 4 Unit Price | Number | 49 | Price per unit for fourth item |
| Item 4 Dropdown Options | Text | None\|0\|0<br>Enabled\|1\|49 | Dropdown options for fourth item (one per line, format: label\|value\|price) |
| Item 4 Visible | Visibility | — | Show or hide fourth line item |
| Show Subtotals | Boolean | true | Display individual subtotals for each line item in results |
| Show Unit Prices | Boolean | true | Display unit prices for each line item in results |
| Total Label | Text | Total Monthly Cost | Label for the total amount |
| CTA Text | Text | Get Your Quote | Call-to-action button text |
| CTA Link | Link | — | Call-to-action button link destination |
| CTA Subtext | Text | No credit card required. Get a detailed quote in minutes. | Helper text below the CTA button |
| Show CTA Subtext | Boolean | true | Display helper text below CTA button |

## Styling

This component automatically adapts to your Webflow site's design system through site variables and inherited properties.

### Site Variables

To match your site's design system, define these CSS variables in your Webflow project settings. The component will use the fallback values shown below until you configure them.

| Site Variable | What It Controls | Fallback |
|---------------|------------------|----------|
| --background-primary | Main background color for cards and panels | #ffffff |
| --background-secondary | Hover states and subtle backgrounds | #f5f5f5 |
| --text-primary | Main text color for headings and labels | #1a1a1a |
| --text-secondary | Muted text for subheadings and helper text | #737373 |
| --border-color | Borders, dividers, and input outlines | #e5e5e5 |
| --accent-color | CTA button, toggle active state, focus outlines | #1a1a1a |
| --accent-text-color | Text color on accent backgrounds | #ffffff |
| --border-radius | Corner rounding for all elements | 8px |

### Inherited Properties

The component inherits these CSS properties from its parent element:
- `font-family` — Typography style
- `color` — Text color
- `line-height` — Text spacing

## Extending in Code

### Custom Calculation Logic

Add custom pricing rules or discounts by listening to value changes:

```javascript
const calculator = document.querySelector('[data-component="quote-builder"]');
calculator.addEventListener('change', (e) => {
  // Apply volume discount when team members > 10
  const teamMembers = parseInt(e.target.dataset.item);
  if (teamMembers > 10) {
    // Apply 15% discount logic
  }
});
```

### Integration with Forms

Connect the calculator to your form submission:

```javascript
const ctaButton = document.querySelector('.wf-quotebuilder-cta');
ctaButton.addEventListener('click', (e) => {
  e.preventDefault();
  const total = document.querySelector('.wf-quotebuilder-total-amount').textContent;
  // Send quote data to your backend or CRM
  submitQuote({ total, items: getSelectedItems() });
});
```

## Dependencies

No external dependencies.