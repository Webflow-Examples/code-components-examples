# CmsFilterSearch

A comprehensive CMS filter and search component for displaying and filtering collection items as cards.

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
| ID | Id | — | HTML ID for targeting |
| View Mode | Variant | grid | Default view mode for items display (grid, list) |
| Grid Columns | Variant | 3 | Number of columns in grid view (2, 3, 4) |
| Heading | TextNode | Browse Our Collection | Main heading above the filter controls |
| Search Placeholder | Text | Search by title or description... | Placeholder text for search input |
| Category Filter Label | Text | Filter by category: | Label text for category filter section |
| All Categories Text | Text | All | Text for the 'All' category filter button |
| Item Count Text | Text | Showing {count} items | Text template for item count (use {count} as placeholder) |
| Empty State Heading | Text | No items found | Heading shown when no items match filters |
| Empty State Message | Text | Try adjusting your search or filters to find what you're looking for. | Message shown when no items match filters |
| Clear Filters Text | Text | Clear all filters | Text for clear filters button |
| Show View Toggle | Boolean | true | Show or hide the grid/list view toggle |
| Show Item Count | Boolean | true | Show or hide the item count display |
| Show Category Filters | Boolean | true | Show or hide category filter buttons |
| Enable Animations | Boolean | true | Enable animated transitions when filtering |
| Item 1 Visible | Visibility | — | Show or hide the first item |
| Item 1 Image | Image | — | First item card image |
| Item 1 Title | Text | Product Design Workshop | First item card title |
| Item 1 Description | Text | Learn the fundamentals of product design with hands-on exercises and real-world examples. | First item card description |
| Item 1 Category | Text | Design | First item category tag |
| Item 1 Link | Link | — | First item card link |
| Item 2 Visible | Visibility | — | Show or hide the second item |
| Item 2 Image | Image | — | Second item card image |
| Item 2 Title | Text | Advanced JavaScript Patterns | Second item card title |
| Item 2 Description | Text | Master advanced JavaScript concepts including closures, prototypes, and async programming. | Second item card description |
| Item 2 Category | Text | Development | Second item category tag |
| Item 2 Link | Link | — | Second item card link |
| Item 3 Visible | Visibility | — | Show or hide the third item |
| Item 3 Image | Image | — | Third item card image |
| Item 3 Title | Text | Content Marketing Strategy | Third item card title |
| Item 3 Description | Text | Build a comprehensive content marketing strategy that drives engagement and conversions. | Third item card description |
| Item 3 Category | Text | Marketing | Third item category tag |
| Item 3 Link | Link | — | Third item card link |
| Item 4 Visible | Visibility | — | Show or hide the fourth item |
| Item 4 Image | Image | — | Fourth item card image |
| Item 4 Title | Text | Data Analytics Fundamentals | Fourth item card title |
| Item 4 Description | Text | Understand how to collect, analyze, and visualize data to make informed business decisions. | Fourth item card description |
| Item 4 Category | Text | Analytics | Fourth item category tag |
| Item 4 Link | Link | — | Fourth item card link |
| Item 5 Visible | Visibility | — | Show or hide the fifth item |
| Item 5 Image | Image | — | Fifth item card image |
| Item 5 Title | Text | Brand Identity Design | Fifth item card title |
| Item 5 Description | Text | Create cohesive brand identities that resonate with your target audience and stand out. | Fifth item card description |
| Item 5 Category | Text | Design | Fifth item category tag |
| Item 5 Link | Link | — | Fifth item card link |
| Item 6 Visible | Visibility | — | Show or hide the sixth item |
| Item 6 Image | Image | — | Sixth item card image |
| Item 6 Title | Text | React Performance Optimization | Sixth item card title |
| Item 6 Description | Text | Learn techniques to optimize React applications for maximum performance and user experience. | Sixth item card description |
| Item 6 Category | Text | Development | Sixth item category tag |
| Item 6 Link | Link | — | Sixth item card link |

## Styling

This component automatically adapts to your Webflow site's design system through site variables and inherited properties.

### Site Variables

To match your site's design system, define these CSS variables in your Webflow project settings. The component will use the fallback values shown below until you configure them.

| Site Variable | What It Controls | Fallback |
|---------------|------------------|----------|
| --background-primary | Main background color for cards and inputs | #ffffff |
| --background-secondary | Hover states and subtle backgrounds | #f5f5f5 |
| --text-primary | Main text color for headings and body text | #1a1a1a |
| --text-secondary | Muted text for labels and placeholders | #737373 |
| --border-color | Borders, dividers, and input outlines | #e5e5e5 |
| --accent-color | Active buttons, selected states, category tags | #1a1a1a |
| --accent-text-color | Text on accent background | #ffffff |
| --border-radius | Corner rounding for all elements | 8px |

### Inherited Properties

The component inherits these CSS properties from its parent element:
- `font-family` — Typography style
- `color` — Text color
- `line-height` — Text spacing

## Extending in Code

### Custom Filter Logic

Add custom filtering logic by accessing the component's filter state:

```javascript
// Add a custom filter based on item metadata
const filterByDate = (items, startDate) => {
  return items.filter(item => 
    new Date(item.publishDate) >= startDate
  );
};
```

### Dynamic Category Loading

Load categories dynamically from an API or CMS:

```javascript
// Fetch and populate categories from external source
const loadCategories = async () => {
  const response = await fetch('/api/categories');
  const categories = await response.json();
  // Update category filter buttons
};
```

## Dependencies

No external dependencies.