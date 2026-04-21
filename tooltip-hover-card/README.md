# TooltipHoverCard

A versatile tooltip and hover card component that displays contextual information when hovering over or focusing on a trigger element.

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
| ID | Id | — | HTML ID attribute for targeting and accessibility |
| Mode | Variant | tooltip | Display mode: simple text tooltip or rich hover card |
| Theme | Variant | dark | Visual theme for the tooltip/card background and text |
| Placement | Variant | top | Preferred placement relative to trigger element |
| Trigger Text | TextNode | Hover me | Text content of the trigger element |
| Tooltip Text | Text | This is helpful information | Plain text content for tooltip mode |
| Card Title | Text | More Information | Title text for hover card mode |
| Card Description | RichText | This hover card provides detailed contextual information with formatting support for better readability. | Rich text description content for hover card mode |
| Card Image | Image | — | Optional image displayed in hover card mode |
| Show Card Image | Visibility | — | Show or hide the image in hover card mode |
| Hover Delay | Number | 200 | Delay in milliseconds before tooltip appears on hover |
| Show Arrow | Boolean | true | Display arrow pointer to trigger element |
| Auto Flip | Boolean | true | Automatically flip placement when near viewport edges |
| Max Width | Number | 300 | Maximum width of tooltip/card in pixels |
| Aria Label | Text | Additional information | Accessible label for screen readers |

## Styling

This component automatically adapts to your Webflow site's design system through site variables and inherited properties.

### Site Variables

To match your site's design system, define these CSS variables in your Webflow project settings. The component will use the fallback values shown below until you configure them.

| Site Variable | What It Controls | Fallback |
|---------------|------------------|----------|
| --background-primary | Light theme background color | #ffffff |
| --background-secondary | Hover state background color | #f5f5f5 |
| --text-primary | Light theme text color | #1a1a1a |
| --text-secondary | Secondary text elements and borders on hover | #737373 |
| --border-color | Border and divider colors | #e5e5e5 |
| --accent-color | Dark theme background and focus outline color | #1a1a1a |
| --accent-text-color | Dark theme text color | #ffffff |
| --border-radius | Corner rounding for all elements | 8px |

### Inherited Properties

The component inherits these CSS properties from its parent element:
- `font-family` — Typography style
- `color` — Text color
- `line-height` — Text spacing

## Extending in Code

### Custom Tooltip Positioning Logic

You can extend the component's positioning behavior by accessing the tooltip element and implementing custom placement calculations:

```javascript
const tooltip = document.querySelector('[data-tooltip-id="my-tooltip"]');
// Add custom viewport boundary detection
// Implement custom offset calculations based on trigger position
```

### Dynamic Content Updates

Update tooltip or hover card content dynamically based on user interactions or data changes:

```javascript
const tooltipComponent = document.querySelector('#my-tooltip');
// Update tooltip text based on context
// Swap between tooltip and hover card modes programmatically
// Adjust hover delay based on user preferences
```

## Dependencies

No external dependencies.