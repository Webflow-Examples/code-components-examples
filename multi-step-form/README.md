# MultiStepForm

A progressive multi-step form component that breaks long forms into sequential steps with smooth slide transitions.

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
| ID | Id | — | HTML ID attribute for the form element |
| Progress Style | Variant | stepper | Visual style of the progress indicator (bar, stepper, dots) |
| Transition Direction | Variant | slide | Animation direction when changing steps (slide, fade) |
| Number of Steps | Number | 3 | Total number of form steps (2-6, excluding review step) |
| Show Review Step | Boolean | true | Show a summary/review step before final submission |
| Form Title | TextNode | Complete Your Application | Main form heading displayed at the top |
| Form Description | Text | Please fill out all required fields to continue | Optional description text below the main heading |
| Step 1 Title | Text | Personal Information | Title for step 1 |
| Step 1 Description | Text | Tell us about yourself | Optional description for step 1 |
| Step 1 Visible | Visibility | — | Show or hide step 1 |
| Step 2 Title | Text | Contact Details | Title for step 2 |
| Step 2 Description | Text | How can we reach you? | Optional description for step 2 |
| Step 2 Visible | Visibility | — | Show or hide step 2 |
| Step 3 Title | Text | Preferences | Title for step 3 |
| Step 3 Description | Text | Customize your experience | Optional description for step 3 |
| Step 3 Visible | Visibility | — | Show or hide step 3 |
| Step 4 Title | Text | Additional Information | Title for step 4 |
| Step 4 Description | Text | Any other details we should know | Optional description for step 4 |
| Step 4 Visible | Visibility | — | Show or hide step 4 |
| Step 5 Title | Text | Review & Confirm | Title for step 5 |
| Step 5 Description | Text | Final details | Optional description for step 5 |
| Step 5 Visible | Visibility | — | Show or hide step 5 |
| Step 6 Title | Text | Confirmation | Title for step 6 |
| Step 6 Description | Text | Last step | Optional description for step 6 |
| Step 6 Visible | Visibility | — | Show or hide step 6 |
| Review Step Title | Text | Review Your Information | Title for the review/summary step |
| Review Step Description | Text | Please review your information before submitting | Description for the review/summary step |
| Back Button Text | Text | Back | Text for the back navigation button |
| Next Button Text | Text | Next | Text for the next navigation button |
| Submit Button Text | Text | Submit | Text for the submit button on the final step |
| Validation Error Message | Text | Please fill out all required fields before continuing | Error message shown when required fields are incomplete |
| Success Message | Text | Thank you! Your form has been submitted successfully. | Message displayed after successful form submission |
| Show Step Numbers | Boolean | true | Display step numbers in the progress indicator |
| Show Step Descriptions | Boolean | true | Display optional descriptions under step titles |
| Allow Step Skipping | Boolean | false | Allow users to click on completed steps to navigate back |
| Form Action | Link | — | Form submission endpoint URL |
| Edit Button Text | Text | Edit | Text for edit buttons on the review step |

## Styling

This component automatically adapts to your Webflow site's design system through site variables and inherited properties.

### Site Variables

To match your site's design system, define these CSS variables in your Webflow project settings. The component will use the fallback values shown below until you configure them.

| Site Variable | What It Controls | Fallback |
|---------------|------------------|----------|
| --background-primary | Main form background and input fields | #ffffff |
| --background-secondary | Hover states, secondary backgrounds, and review sections | #f5f5f5 |
| --text-primary | Main text color for headings and content | #1a1a1a |
| --text-secondary | Labels, descriptions, and muted text | #737373 |
| --border-color | Borders, dividers, and progress indicators | #e5e5e5 |
| --accent-color | Active steps, primary buttons, and progress fill | #1a1a1a |
| --accent-text-color | Text on accent-colored backgrounds | #ffffff |
| --border-radius | Corner rounding for all form elements | 8px |

### Inherited Properties

The component inherits these CSS properties from its parent element:
- `font-family` — Typography style
- `color` — Text color
- `line-height` — Text spacing

## Extending in Code

### Custom Form Submission Handler

Intercept form submission to send data to your own API endpoint:

```javascript
document.querySelector('.wf-multistepform-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      // Show success state
      console.log('Form submitted successfully');
    }
  } catch (error) {
    console.error('Submission failed:', error);
  }
});
```

### Track Step Progress with Analytics

Monitor user progress through the form steps:

```javascript
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'class') {
      const activeStep = document.querySelector('.wf-multistepform-progress-step-active');
      if (activeStep) {
        const stepNumber = activeStep.querySelector('.wf-multistepform-progress-step-number').textContent;
        // Send to your analytics platform
        analytics.track('Form Step Viewed', { step: stepNumber });
      }
    }
  });
});

document.querySelectorAll('.wf-multistepform-progress-step').forEach((step) => {
  observer.observe(step, { attributes: true });
});
```

## Dependencies

No external dependencies.