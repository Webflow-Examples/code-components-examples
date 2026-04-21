# ModalDialog
A modal dialog component that displays as a centered overlay with a semi-transparent backdrop.

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
| ID | Id | — | HTML ID for targeting the modal container |
| Is Open | Boolean | false | Controls whether the modal is currently open or closed |
| Max Width | Variant | medium | Maximum width of the modal dialog (small, medium, large) |
| Close On Backdrop Click | Boolean | true | Whether clicking the backdrop closes the modal |
| Trigger Button Text | Text | Open Modal | Text displayed on the button that opens the modal |
| Modal Title | TextNode | Modal Title | Main heading displayed at the top of the modal |
| Body Content | RichText | This is the modal body content... | Rich text content displayed in the modal body |
| Content Slot | Slot | — | Optional slot for custom component content instead of rich text |
| Show Close Button | Visibility | — | Show or hide the close button in the top-right corner |
| Close Button Label | Text | Close modal | Accessible label for the close button |
| Animation Duration | Number | 300 | Duration of open/close animation in milliseconds |
| Enable Escape Key | Boolean | true | Whether pressing Escape key closes the modal |
| Show Trigger Button | Visibility | — | Show or hide the trigger button |

## Styling

This component automatically adapts to your Webflow site's design system through site variables and inherited properties.

### Site Variables

To match your site's design system, define these CSS variables in your Webflow project settings. The component will use the fallback values shown below until you configure them.

| Site Variable | What It Controls | Fallback |
|---------------|------------------|----------|
| --background-primary | Modal container background color | #ffffff |
| --background-secondary | Trigger button hover state background | #f5f5f5 |
| --text-primary | Modal title and body text color | #1a1a1a |
| --text-secondary | Close button icon color | #737373 |
| --border-color | Modal container and header border color | #e5e5e5 |
| --accent-color | Trigger button background and link color | #1a1a1a |
| --accent-text-color | Trigger button text color | #ffffff |
| --border-radius | Modal and button corner rounding | 8px |

### Inherited Properties

The component inherits these CSS properties from its parent element:
- `font-family` — Typography style
- `color` — Text color
- `line-height` — Text spacing

## Extending in Code

### Custom Modal Width Variants

Modify the max-width values for different size variants by targeting the component's CSS custom property:

```css
/* Small modal */
.wf-modaldialog[data-max-width="small"] {
  --wf-modaldialog-max-width: 400px;
}

/* Large modal */
.wf-modaldialog[data-max-width="large"] {
  --wf-modaldialog-max-width: 900px;
}
```

### Programmatic Modal Control

Control the modal state through custom interactions by targeting the component's ID:

```javascript
// Open modal
const modal = document.querySelector('#my-modal');
modal.setAttribute('data-is-open', 'true');

// Close modal
modal.setAttribute('data-is-open', 'false');
```

## Dependencies

No external dependencies.