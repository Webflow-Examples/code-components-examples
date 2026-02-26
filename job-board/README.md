# JobBoard

A dynamic job board component that fetches and displays open positions from the Greenhouse API with filtering, pagination, and responsive layouts.

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
| Board Token | Text | — | Greenhouse board token for API authentication (from boards-api.greenhouse.io) |
| Heading | TextNode | Open Positions | Main heading displayed at the top of the job board |
| Subheading | Text | Join our team and help us build the future | Subheading text below the main heading |
| Layout | Variant | 3-column | Grid layout columns for job cards on desktop (2-column, 3-column, 4-column) |
| Card Style | Variant | elevated | Visual style of job cards (elevated, outlined, minimal) |
| Show Filters | Boolean | true | Show or hide the department and location filter dropdowns |
| Filter Department Label | Text | Department | Label text for the department filter dropdown |
| Filter Location Label | Text | Location | Label text for the location filter dropdown |
| Filter All Departments Text | Text | All Departments | Default option text for all departments in filter |
| Filter All Locations Text | Text | All Locations | Default option text for all locations in filter |
| Jobs Per Page | Number | 12 | Number of jobs to display per page or load batch |
| Pagination Type | Variant | load-more | How to handle multiple pages of jobs (load-more, pagination, show-all) |
| Load More Button Text | Text | Load More Jobs | Text for the Load More button |
| Previous Button Text | Text | Previous | Text for the previous page button (pagination mode) |
| Next Button Text | Text | Next | Text for the next page button (pagination mode) |
| Apply Button Text | Text | Apply Now | Text for the apply button on each job card |
| Department Label Text | Text | Department: | Label prefix for department on job cards |
| Location Label Text | Text | Location: | Label prefix for location on job cards |
| Show Department On Card | Boolean | true | Display department information on job cards |
| Show Location On Card | Boolean | true | Display location information on job cards |
| Open In New Tab | Boolean | true | Open job application links in a new browser tab |
| Loading Text | Text | Loading open positions... | Text displayed during initial data loading |
| Show Loading Spinner | Boolean | true | Show animated spinner during loading |
| Error Heading | Text | Unable to Load Jobs | Heading text for error state |
| Error Message | Text | We're having trouble loading our open positions. Please try again later or contact us directly. | Error message text when API call fails |
| Retry Button Text | Text | Try Again | Text for retry button in error state |
| Show Retry Button | Boolean | true | Show retry button in error state |
| Empty State Heading | Text | No Positions Available | Heading text when no jobs are found |
| Empty State Message | Text | There are no open positions matching your criteria at this time. Check back soon or adjust your filters. | Message text when no jobs match current filters |
| Results Count Text | Text | {count} positions found | Text template for showing job count (use {count} as placeholder) |
| Show Results Count | Boolean | true | Display the total number of jobs found |
| Cache Timeout | Number | 5 | API response cache duration in minutes (0 to disable) |

## Styling

This component automatically adapts to your Webflow site's design system through site variables and inherited properties.

### Site Variables

To match your site's design system, define these CSS variables in your Webflow project settings. The component will use the fallback values shown below until you configure them.

| Site Variable | What It Controls | Fallback |
|---------------|------------------|----------|
| --background-primary | Main background color for cards and containers | #ffffff |
| --background-secondary | Hover states and filter backgrounds | #f5f5f5 |
| --text-primary | Main text color for headings and body text | #1a1a1a |
| --text-secondary | Secondary text for labels and meta information | #737373 |
| --border-color | Borders, dividers, and card outlines | #e5e5e5 |
| --accent-color | Primary action buttons and selected states | #1a1a1a |
| --accent-text-color | Text color on accent backgrounds | #ffffff |
| --border-radius | Corner rounding for all elements | 8px |

### Inherited Properties

The component inherits these CSS properties from its parent element:
- `font-family` — Typography style
- `color` — Text color
- `line-height` — Text spacing

## Extending in Code

### Custom Job Card Rendering

Add custom metadata or badges to job cards by extending the card rendering logic:

```typescript
// Add a "Featured" badge for specific departments
if (job.departments[0]?.name === 'Engineering') {
  cardElement.insertAdjacentHTML('afterbegin', 
    '<span class="featured-badge">Featured</span>'
  );
}
```

### Advanced Filtering

Implement custom filter logic beyond department and location:

```typescript
// Filter by job type (full-time, part-time, etc.)
const filteredJobs = jobs.filter(job => {
  const matchesDepartment = selectedDepartment === 'all' || 
    job.departments.some(d => d.name === selectedDepartment);
  const matchesType = job.metadata?.employment_type === selectedType;
  return matchesDepartment && matchesType;
});
```

## Dependencies

No external dependencies.