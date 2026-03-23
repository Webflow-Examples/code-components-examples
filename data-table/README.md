# DataTable

A fully-featured data table component that renders structured tabular data with interactive sorting and filtering capabilities.

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
| ID | Id | — | HTML ID attribute for the table container |
| Heading | TextNode | Data Table | Main heading displayed above the table |
| Data JSON | Text | [{"name":"Alice Johnson",...}] | JSON array of data objects to display. Each object represents a row with key-value pairs for columns |
| Density | Variant | comfortable | Row spacing and padding density (compact/comfortable) |
| Show Striped Rows | Boolean | true | Enable alternating row background colors |
| Show Hover Highlight | Boolean | true | Enable row highlighting on hover |
| Search Placeholder | Text | Search across all columns... | Placeholder text for the search input field |
| Show Search | Visibility | — | Show or hide the search input |
| Show Row Count | Visibility | — | Show or hide the row count display |
| Row Count Text | Text | Showing {filtered} of {total} rows | Template for row count display. Use {filtered} and {total} as placeholders |
| Empty State Heading | Text | No results found | Heading shown when no rows match the filter |
| Empty State Message | Text | Try adjusting your search... | Message shown when no rows match the filter |
| Enable Sorting | Boolean | true | Enable column header click-to-sort functionality |
| Default Sort Column | Text | — | Column key to sort by on initial load (leave empty for no default sort) |
| Default Sort Direction | Variant | ascending | Default sort direction for the initial sort column (ascending/descending) |
| Column 1 Key | Text | name | JSON key for first column data |
| Column 1 Label | Text | Name | Display label for first column header |
| Column 1 Visible | Visibility | — | Show or hide the first column |
| Column 2 Key | Text | email | JSON key for second column data |
| Column 2 Label | Text | Email | Display label for second column header |
| Column 2 Visible | Visibility | — | Show or hide the second column |
| Column 3 Key | Text | role | JSON key for third column data |
| Column 3 Label | Text | Role | Display label for third column header |
| Column 3 Visible | Visibility | — | Show or hide the third column |
| Column 4 Key | Text | status | JSON key for fourth column data |
| Column 4 Label | Text | Status | Display label for fourth column header |
| Column 4 Visible | Visibility | — | Show or hide the fourth column |
| Column 5 Key | Text | — | JSON key for fifth column data |
| Column 5 Label | Text | Column 5 | Display label for fifth column header |
| Column 5 Visible | Visibility | — | Show or hide the fifth column |
| Column 6 Key | Text | — | JSON key for sixth column data |
| Column 6 Label | Text | Column 6 | Display label for sixth column header |
| Column 6 Visible | Visibility | — | Show or hide the sixth column |
| Column 7 Key | Text | — | JSON key for seventh column data |
| Column 7 Label | Text | Column 7 | Display label for seventh column header |
| Column 7 Visible | Visibility | — | Show or hide the seventh column |
| Column 8 Key | Text | — | JSON key for eighth column data |
| Column 8 Label | Text | Column 8 | Display label for eighth column header |
| Column 8 Visible | Visibility | — | Show or hide the eighth column |
| Column 9 Key | Text | — | JSON key for ninth column data |
| Column 9 Label | Text | Column 9 | Display label for ninth column header |
| Column 9 Visible | Visibility | — | Show or hide the ninth column |
| Column 10 Key | Text | — | JSON key for tenth column data |
| Column 10 Label | Text | Column 10 | Display label for tenth column header |
| Column 10 Visible | Visibility | — | Show or hide the tenth column |

## Styling

This component automatically adapts to your Webflow site's design system through site variables and inherited properties.

### Site Variables

To match your site's design system, define these CSS variables in your Webflow project settings. The component will use the fallback values shown below until you configure them.

| Site Variable | What It Controls | Fallback |
|---------------|------------------|----------|
| --background-primary | Table background, card backgrounds, header background | #ffffff |
| --background-secondary | Striped rows, hover states | #f5f5f5 |
| --text-primary | Main text, headings, table data, card values | #1a1a1a |
| --text-secondary | Row count, empty state message, card labels, search placeholder | #737373 |
| --border-color | Table borders, card borders, input borders, row separators | #e5e5e5 |
| --accent-color | Sort indicator active state, input focus border and outline | #1a1a1a |
| --border-radius | Table container, cards, search input rounding | 8px |

### Inherited Properties

The component inherits these CSS properties from its parent element:
- `font-family` — Typography style
- `color` — Text color
- `line-height` — Text spacing

## Extending in Code

### Custom Data Formatting

Add custom formatting for specific column types by modifying the cell rendering logic:

```javascript
// Format currency values
if (column.key === 'price') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

// Format dates
if (column.key === 'createdAt') {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
```

### Advanced Filtering

Extend the search functionality to support column-specific filters:

```javascript
// Add filter by status
const filteredData = data.filter(row => {
  const matchesSearch = searchTerm === '' || 
    Object.values(row).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  const matchesStatus = !statusFilter || row.status === statusFilter;
  
  return matchesSearch && matchesStatus;
});
```

## Dependencies

No external dependencies.