# ToastNotification

A toast notification system that displays temporary messages in a configurable screen corner with smooth animations and auto-dismiss functionality.

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
| ID | Id | — | HTML ID attribute for the toast container |
| Position | Variant | top-right | Screen corner position where toasts appear (top-right, top-left, bottom-right, bottom-left) |
| Variant | Variant | info | Visual style and color scheme of the toast (success, error, warning, info) |
| Message | TextNode | Notification message | Primary message text displayed prominently |
| Description | Text | Additional details about this notification | Optional secondary description text below the message |
| Show Description | Visibility | — | Show or hide the description text |
| Duration | Number | 5000 | Auto-dismiss duration in milliseconds |
| Show Progress Bar | Boolean | true | Display animated progress bar showing time until auto-dismiss |
| Show Close Button | Boolean | true | Display close button for manual dismissal |
| Max Toasts | Number | 5 | Maximum number of toasts visible simultaneously |
| Enable Animations | Boolean | true | Enable smooth slide and fade animations |
| Toast 1 Message | Text | Changes saved successfully | Message text for first demo toast |
| Toast 1 Description | Text | Your profile has been updated | Description text for first demo toast |
| Toast 1 Variant | Variant | success | Variant style for first demo toast |
| Toast 1 Visible | Visibility | — | Show or hide the first demo toast |
| Toast 2 Message | Text | Connection error | Message text for second demo toast |
| Toast 2 Description | Text | Unable to reach the server | Description text for second demo toast |
| Toast 2 Variant | Variant | error | Variant style for second demo toast |
| Toast 2 Visible | Visibility | — | Show or hide the second demo toast |
| Toast 3 Message | Text | Storage almost full | Message text for third demo toast |
| Toast 3 Description | Text | You have used 90% of your storage | Description text for third demo toast |
| Toast 3 Variant | Variant | warning | Variant style for third demo toast |
| Toast 3 Visible | Visibility | — | Show or hide the third demo toast |

## Styling

This component automatically adapts to your Webflow site's design system through site variables and inherited properties.

### Site Variables

To match your site's design system, define these CSS variables in your Webflow project settings. The component will use the fallback values shown below until you configure them.

| Site Variable | What It Controls | Fallback |
|---------------|------------------|----------|
| --background-primary | Toast card background color | #ffffff |
| --background-secondary | Close button hover state background | #f5f5f5 |
| --text-primary | Message text color | #1a1a1a |
| --text-secondary | Description text and close button color | #737373 |
| --border-color | Toast card border and progress bar background | #e5e5e5 |
| --border-radius | Toast card and button corner rounding | 8px |
| --success-color | Success variant border, icon, and progress bar color | #22c55e |
| --success-bg | Success variant background tint | #f0fdf4 |
| --error-color | Error variant border, icon, and progress bar color | #ef4444 |
| --error-bg | Error variant background tint | #fef2f2 |
| --warning-color | Warning variant border, icon, and progress bar color | #f59e0b |
| --warning-bg | Warning variant background tint | #fffbeb |
| --info-color | Info variant border, icon, and progress bar color | #3b82f6 |
| --info-bg | Info variant background tint | #eff6ff |

### Inherited Properties

The component inherits these CSS properties from its parent element:
- `font-family` — Typography style
- `color` — Text color
- `line-height` — Text spacing

## Extending in Code

### Triggering Toasts Programmatically

To show toasts dynamically based on user actions or application events:

```javascript
// Access the toast container element
const toastContainer = document.querySelector('[data-component="toast-notification"]');

// Create and dispatch a custom event to trigger a new toast
const showToast = (message, description, variant = 'info') => {
  const event = new CustomEvent('showToast', {
    detail: { message, description, variant }
  });
  toastContainer.dispatchEvent(event);
};

// Usage examples
showToast('Form submitted', 'Your data has been saved', 'success');
showToast('Network error', 'Please check your connection', 'error');
```

### Customizing Animation Duration

Adjust the slide-in animation speed for different timing preferences:

```css
.wf-toastnotification-animated .wf-toastnotification-card {
  animation-duration: 0.5s; /* Slower entrance */
}
```

## Dependencies

No external dependencies.