# ToggleSwitch
A switch/toggle component for on/off boolean states with smooth animations and accessibility features.

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
| ID | Id | — | HTML ID attribute for the toggle switch |
| Size | Variant | medium | Visual size of the switch and text (small, medium, large) |
| Label Position | Variant | left | Position of the label relative to the switch (left, right) |
| Label | TextNode | Enable notifications | Main label text for the switch |
| Description | Text | Receive email updates about your account | Optional description text below the label |
| Default Checked | Boolean | false | Initial checked state of the switch |
| Is Disabled | Boolean | false | Disable the switch and prevent interaction |
| Show Icons | Boolean | false | Display on/off icons inside the thumb |
| Show Description | Visibility | — | Show or hide the description text |

## Styling

This component automatically adapts to your Webflow site's design system through site variables and inherited properties.

### Site Variables

To match your site's design system, define these CSS variables in your Webflow project settings. The component will use the fallback values shown below until you configure them.

| Site Variable | What It Controls | Fallback |
|---------------|------------------|----------|
| --background-primary | Track background when unchecked | #ffffff |
| --background-secondary | Track background on hover | #f5f5f5 |
| --text-primary | Label text color and unchecked thumb color | #1a1a1a |
| --text-secondary | Description text color | #737373 |
| --border-color | Track border color | #e5e5e5 |
| --accent-color | Track background when checked and focus ring color | #1a1a1a |
| --accent-text-color | Thumb color and icon color when checked | #ffffff |
| --border-radius | Track and thumb border radius | 8px |

### Inherited Properties

The component inherits these CSS properties from its parent element:
- `font-family` — Typography style
- `color` — Text color
- `line-height` — Text spacing

## Extending in Code

### Custom Toggle Handler

Add custom logic when the toggle state changes:

```javascript
const toggle = document.querySelector('#my-toggle');
toggle.addEventListener('change', (e) => {
  if (e.target.checked) {
    // Enable feature
    console.log('Feature enabled');
  } else {
    // Disable feature
    console.log('Feature disabled');
  }
});
```

### Programmatic State Control

Control the toggle state from your code:

```javascript
const toggle = document.querySelector('#my-toggle');
// Set checked state
toggle.checked = true;
// Trigger change event
toggle.dispatchEvent(new Event('change'));
```

## Dependencies

No external dependencies.