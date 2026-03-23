# PaginationControls
A flexible pagination component for navigating through pages of content with multiple display styles and responsive design.

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
| Style | Variant | numbered | Pagination display style (numbered, simple, loadMore) |
| Size | Variant | default | Component size variant (default, compact) |
| Alignment | Variant | center | Horizontal alignment of pagination controls (left, center, right) |
| Current Page | Number | 1 | Currently active page number |
| Total Pages | Number | 20 | Total number of pages available |
| Items Per Page | Number | 10 | Number of items displayed per page |
| Total Items | Number | 200 | Total number of items across all pages |
| Previous Text | Text | Previous | Text label for Previous button |
| Next Text | Text | Next | Text label for Next button |
| Load More Text | Text | Load More | Text label for Load More button (loadMore style only) |
| Page Label | Text | Page | Label text before page indicator |
| Of Label | Text | of | Label text between current and total pages |
| Items Label | Text | items | Label text for items count display |
| Show Page Info | Boolean | true | Display 'Page X of Y' text indicator |
| Show Items Count | Boolean | false | Display items per page and total items count |
| Show First Last | Boolean | false | Show First and Last page buttons (numbered style only) |
| Show Previous Next | Boolean | true | Show Previous and Next navigation buttons |
| Max Visible Pages | Number | 7 | Maximum number of page buttons to show before truncating with ellipsis |
| First Page Text | Text | First | Text label for First page button |
| Last Page Text | Text | Last | Text label for Last page button |
| Aria Label | Text | Pagination Navigation | ARIA label for pagination navigation landmark |

## Styling

This component automatically adapts to your Webflow site's design system through site variables and inherited properties.

### Site Variables

To match your site's design system, define these CSS variables in your Webflow project settings. The component will use the fallback values shown below until you configure them.

| Site Variable | What It Controls | Fallback |
|---------------|------------------|----------|
| --background-primary | Main background color for buttons | #ffffff |
| --background-secondary | Hover state background color | #f5f5f5 |
| --text-primary | Main text color for buttons | #1a1a1a |
| --text-secondary | Muted text color for labels and info text | #737373 |
| --border-color | Border color for buttons and dividers | #e5e5e5 |
| --accent-color | Active page background and Load More button color | #1a1a1a |
| --accent-text-color | Text color on accent backgrounds | #ffffff |
| --border-radius | Corner rounding for all buttons | 8px |

### Inherited Properties

The component inherits these CSS properties from its parent element:
- `font-family` — Typography style
- `color` — Text color
- `line-height` — Text spacing

## Extending in Code

### Connecting to Dynamic Content

Use the component's ID to update pagination state when filtering or loading data:

```javascript
// Update pagination when content changes
const pagination = document.querySelector('#product-pagination');
const updatePagination = (current, total) => {
  pagination.setAttribute('data-current-page', current);
  pagination.setAttribute('data-total-pages', total);
};

// Example: After fetching filtered results
fetch('/api/products?category=shoes')
  .then(res => res.json())
  .then(data => {
    updatePagination(1, Math.ceil(data.total / 10));
  });
```

### Custom Page Change Handler

Add custom logic when users navigate between pages:

```javascript
document.addEventListener('click', (e) => {
  const pageButton = e.target.closest('.wf-paginationcontrols-page');
  if (pageButton && !pageButton.classList.contains('wf-paginationcontrols-page-active')) {
    const pageNumber = parseInt(pageButton.textContent);
    loadPage(pageNumber);
  }
});

function loadPage(page) {
  // Your custom page loading logic
  console.log(`Loading page ${page}`);
}
```

## Dependencies

No external dependencies.