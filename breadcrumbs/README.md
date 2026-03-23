# Breadcrumbs
A breadcrumb navigation component that displays a hierarchical path to the current page.

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
| Separator | Variant | chevron | Visual separator between breadcrumb items (slash, chevron, or arrow) |
| Home Link | Link | — | URL for the home icon link |
| Level 1 Label | Text | Products | Label text for first level breadcrumb |
| Level 1 Link | Link | — | URL for first level breadcrumb |
| Level 1 Visible | Visibility | — | Show or hide level 1 breadcrumb |
| Level 2 Label | Text | Electronics | Label text for second level breadcrumb |
| Level 2 Link | Link | — | URL for second level breadcrumb |
| Level 2 Visible | Visibility | — | Show or hide level 2 breadcrumb |
| Level 3 Label | Text | Laptops | Label text for third level breadcrumb |
| Level 3 Link | Link | — | URL for third level breadcrumb |
| Level 3 Visible | Visibility | — | Show or hide level 3 breadcrumb |
| Level 4 Label | Text | Gaming | Label text for fourth level breadcrumb |
| Level 4 Link | Link | — | URL for fourth level breadcrumb |
| Level 4 Visible | Visibility | — | Show or hide level 4 breadcrumb |
| Level 5 Label | Text | High Performance | Label text for fifth level breadcrumb |
| Level 5 Link | Link | — | URL for fifth level breadcrumb |
| Level 5 Visible | Visibility | — | Show or hide level 5 breadcrumb |
| Current Page Label | TextNode | Gaming Laptop X1 | Label for the current page (final breadcrumb, non-clickable) |

## Styling

This component automatically adapts to your Webflow site's design system through site variables and inherited properties.

### Site Variables

To match your site's design system, define these CSS variables in your Webflow project settings. The component will use the fallback values shown below until you configure them.

| Site Variable | What It Controls | Fallback |
|---------------|------------------|----------|
| --background-primary | Main background color for ellipsis menu | #ffffff |
| --background-secondary | Hover state background for links and buttons | #f5f5f5 |
| --text-primary | Main text color for breadcrumb items | #1a1a1a |
| --text-secondary | Color for separators between breadcrumbs | #737373 |
| --border-color | Border color for ellipsis menu and active states | #e5e5e5 |
| --accent-color | Link hover color and focus outline | #1a1a1a |
| --border-radius | Border radius for menu, buttons, and hover states | 8px |

### Inherited Properties

The component inherits these CSS properties from its parent element:
- `font-family` — Typography style
- `color` — Text color
- `line-height` — Text spacing

## Extending in Code

### Custom Separator Icons
Replace the default separator characters with custom icons by targeting the `.wf-breadcrumbs-separator` class and using CSS pseudo-elements or inline SVGs.

### Dynamic Breadcrumb Generation
For CMS-driven pages, use Webflow's CMS binding to populate breadcrumb labels and links dynamically based on collection structure and parent-child relationships.

## Dependencies

No external dependencies.