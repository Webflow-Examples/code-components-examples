# ProgressStepper

A multi-step progress indicator that visually tracks user progress through a sequential process.

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
| Orientation | Variant | horizontal | Layout direction of the stepper (horizontal or vertical) |
| Clickable | Boolean | false | Allow clicking on completed steps to navigate back |
| Current Step | Number | 1 | The currently active step number (1-based index) |
| Total Steps | Number | 4 | Total number of steps to display (3-8) |
| Step 1 Label | Text | Account Setup | Label text for step 1 |
| Step 1 Description | Text | Create your account | Optional description text for step 1 |
| Step 1 Visible | Visibility | — | Show or hide step 1 |
| Step 2 Label | Text | Personal Info | Label text for step 2 |
| Step 2 Description | Text | Enter your details | Optional description text for step 2 |
| Step 2 Visible | Visibility | — | Show or hide step 2 |
| Step 3 Label | Text | Payment | Label text for step 3 |
| Step 3 Description | Text | Add payment method | Optional description text for step 3 |
| Step 3 Visible | Visibility | — | Show or hide step 3 |
| Step 4 Label | Text | Confirmation | Label text for step 4 |
| Step 4 Description | Text | Review and confirm | Optional description text for step 4 |
| Step 4 Visible | Visibility | — | Show or hide step 4 |
| Step 5 Label | Text | Preferences | Label text for step 5 |
| Step 5 Description | Text | Set your preferences | Optional description text for step 5 |
| Step 5 Visible | Visibility | — | Show or hide step 5 |
| Step 6 Label | Text | Verification | Label text for step 6 |
| Step 6 Description | Text | Verify your identity | Optional description text for step 6 |
| Step 6 Visible | Visibility | — | Show or hide step 6 |
| Step 7 Label | Text | Integration | Label text for step 7 |
| Step 7 Description | Text | Connect your tools | Optional description text for step 7 |
| Step 7 Visible | Visibility | — | Show or hide step 7 |
| Step 8 Label | Text | Complete | Label text for step 8 |
| Step 8 Description | Text | Finish setup | Optional description text for step 8 |
| Step 8 Visible | Visibility | — | Show or hide step 8 |
| Show Descriptions | Boolean | true | Display description text below step labels |

## Styling

This component automatically adapts to your Webflow site's design system through site variables and inherited properties.

### Site Variables

To match your site's design system, define these CSS variables in your Webflow project settings. The component will use the fallback values shown below until you configure them.

| Site Variable | What It Controls | Fallback |
|---------------|------------------|----------|
| --background-primary | Step circle backgrounds | #ffffff |
| --background-secondary | Hover states for clickable steps | #f5f5f5 |
| --text-primary | Step labels and numbers | #1a1a1a |
| --text-secondary | Step descriptions and upcoming steps | #737373 |
| --border-color | Step circle borders and connectors | #e5e5e5 |
| --accent-color | Current and completed step backgrounds | #1a1a1a |
| --accent-text-color | Text on accent backgrounds | #ffffff |
| --border-radius | Step circle rounding | — |

### Inherited Properties

The component inherits these CSS properties from its parent element:
- `font-family` — Typography style
- `color` — Text color
- `line-height` — Text spacing

## Extending in Code

### Controlling Progress Programmatically

Update the `currentStep` property to advance or navigate through steps:

```javascript
// Get the stepper component
const stepper = document.querySelector('[data-component="progress-stepper"]');

// Advance to next step
function nextStep() {
  const current = parseInt(stepper.getAttribute('data-current-step'));
  const total = parseInt(stepper.getAttribute('data-total-steps'));
  if (current < total) {
    stepper.setAttribute('data-current-step', current + 1);
  }
}

// Go to specific step
function goToStep(stepNumber) {
  stepper.setAttribute('data-current-step', stepNumber);
}
```

### Listening for Step Navigation

When clickable mode is enabled, listen for step navigation events:

```javascript
const stepper = document.querySelector('[data-component="progress-stepper"]');

stepper.addEventListener('click', (e) => {
  const stepButton = e.target.closest('.wf-progressstepper-circle-clickable');
  if (stepButton) {
    const stepNumber = stepButton.getAttribute('data-step');
    console.log(`Navigated to step ${stepNumber}`);
    // Trigger your custom logic here
  }
});
```

## Dependencies

No external dependencies.