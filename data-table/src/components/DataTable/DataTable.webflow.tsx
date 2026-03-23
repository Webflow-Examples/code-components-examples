import DataTable from "./DataTable";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import "./DataTable.css";

export default declareComponent(DataTable, {
  name: "DataTable",
  description: "A fully-featured data table component that renders structured tabular data with interactive sorting and filtering capabilities. Displays data in a traditional table layout on desktop with clickable column headers that toggle between ascending and descending sort with visual arrow indicators. Includes a search input at the top that filters rows across all columns in real-time, with a row count display showing total and filtered results. Supports visual customization through striped rows, hover highlighting, and density variants (compact/comfortable spacing). On mobile viewports, automatically transforms into a card-based stacked layout where each row becomes a card with label-value pairs. Shows an empty state message when no rows match the current filter. Accepts data as JSON through a text prop and supports up to 10 columns and 100 rows with smooth client-side performance.",
  group: "Data Display",
  options: {
    ssr: false,
    applyTagSelectors: true
  },
  props: {
    id: props.Id({
      name: "Element ID",
      group: "Settings",
      tooltip: "HTML ID attribute for the table container"
    }),
    heading: props.TextNode({
      name: "Heading",
      defaultValue: "Data Table",
      group: "Content",
      tooltip: "Main heading displayed above the table"
    }),
    dataJson: props.Text({
      name: "Data JSON",
      defaultValue: '[{"name":"Alice Johnson","email":"alice@example.com","role":"Designer","status":"Active"},{"name":"Bob Smith","email":"bob@example.com","role":"Developer","status":"Active"},{"name":"Carol White","email":"carol@example.com","role":"Manager","status":"Inactive"}]',
      group: "Content",
      tooltip: "JSON array of data objects to display"
    }),
    density: props.Variant({
      name: "Density",
      options: ["compact", "comfortable"],
      defaultValue: "comfortable",
      group: "Style",
      tooltip: "Row spacing and padding density"
    }),
    showStripedRows: props.Boolean({
      name: "Striped Rows",
      defaultValue: true,
      group: "Style",
      tooltip: "Enable alternating row background colors"
    }),
    showHoverHighlight: props.Boolean({
      name: "Hover Highlight",
      defaultValue: true,
      group: "Style",
      tooltip: "Enable row highlighting on hover"
    }),
    searchPlaceholder: props.Text({
      name: "Search Placeholder",
      defaultValue: "Search across all columns...",
      group: "Content",
      tooltip: "Placeholder text for the search input field"
    }),
    showSearch: props.Visibility({
      name: "Show Search",
      group: "Display",
      tooltip: "Show or hide the search input"
    }),
    showRowCount: props.Visibility({
      name: "Show Row Count",
      group: "Display",
      tooltip: "Show or hide the row count display"
    }),
    rowCountText: props.Text({
      name: "Row Count Text",
      defaultValue: "Showing {filtered} of {total} rows",
      group: "Content",
      tooltip: "Template for row count display"
    }),
    emptyStateHeading: props.Text({
      name: "Empty State Heading",
      defaultValue: "No results found",
      group: "Empty State",
      tooltip: "Heading shown when no rows match the filter"
    }),
    emptyStateMessage: props.Text({
      name: "Empty State Message",
      defaultValue: "Try adjusting your search to find what you're looking for.",
      group: "Empty State",
      tooltip: "Message shown when no rows match the filter"
    }),
    enableSorting: props.Boolean({
      name: "Enable Sorting",
      defaultValue: true,
      group: "Behavior",
      tooltip: "Enable column header click-to-sort functionality"
    }),
    defaultSortColumn: props.Text({
      name: "Default Sort Column",
      defaultValue: "",
      group: "Behavior",
      tooltip: "Column key to sort by on initial load"
    }),
    defaultSortDirection: props.Variant({
      name: "Default Sort Direction",
      options: ["ascending", "descending"],
      defaultValue: "ascending",
      group: "Behavior",
      tooltip: "Default sort direction for the initial sort column"
    }),
    column1Key: props.Text({
      name: "Column 1 Key",
      defaultValue: "name",
      group: "Column 1",
      tooltip: "JSON key for first column data"
    }),
    column1Label: props.Text({
      name: "Column 1 Label",
      defaultValue: "Name",
      group: "Column 1",
      tooltip: "Display label for first column header"
    }),
    column1Visible: props.Visibility({
      name: "Column 1 Visible",
      group: "Column 1",
      tooltip: "Show or hide the first column"
    }),
    column2Key: props.Text({
      name: "Column 2 Key",
      defaultValue: "email",
      group: "Column 2",
      tooltip: "JSON key for second column data"
    }),
    column2Label: props.Text({
      name: "Column 2 Label",
      defaultValue: "Email",
      group: "Column 2",
      tooltip: "Display label for second column header"
    }),
    column2Visible: props.Visibility({
      name: "Column 2 Visible",
      group: "Column 2",
      tooltip: "Show or hide the second column"
    }),
    column3Key: props.Text({
      name: "Column 3 Key",
      defaultValue: "role",
      group: "Column 3",
      tooltip: "JSON key for third column data"
    }),
    column3Label: props.Text({
      name: "Column 3 Label",
      defaultValue: "Role",
      group: "Column 3",
      tooltip: "Display label for third column header"
    }),
    column3Visible: props.Visibility({
      name: "Column 3 Visible",
      group: "Column 3",
      tooltip: "Show or hide the third column"
    }),
    column4Key: props.Text({
      name: "Column 4 Key",
      defaultValue: "status",
      group: "Column 4",
      tooltip: "JSON key for fourth column data"
    }),
    column4Label: props.Text({
      name: "Column 4 Label",
      defaultValue: "Status",
      group: "Column 4",
      tooltip: "Display label for fourth column header"
    }),
    column4Visible: props.Visibility({
      name: "Column 4 Visible",
      group: "Column 4",
      tooltip: "Show or hide the fourth column"
    }),
    column5Key: props.Text({
      name: "Column 5 Key",
      defaultValue: "",
      group: "Column 5",
      tooltip: "JSON key for fifth column data"
    }),
    column5Label: props.Text({
      name: "Column 5 Label",
      defaultValue: "Column 5",
      group: "Column 5",
      tooltip: "Display label for fifth column header"
    }),
    column5Visible: props.Visibility({
      name: "Column 5 Visible",
      group: "Column 5",
      tooltip: "Show or hide the fifth column"
    }),
    column6Key: props.Text({
      name: "Column 6 Key",
      defaultValue: "",
      group: "Column 6",
      tooltip: "JSON key for sixth column data"
    }),
    column6Label: props.Text({
      name: "Column 6 Label",
      defaultValue: "Column 6",
      group: "Column 6",
      tooltip: "Display label for sixth column header"
    }),
    column6Visible: props.Visibility({
      name: "Column 6 Visible",
      group: "Column 6",
      tooltip: "Show or hide the sixth column"
    }),
    column7Key: props.Text({
      name: "Column 7 Key",
      defaultValue: "",
      group: "Column 7",
      tooltip: "JSON key for seventh column data"
    }),
    column7Label: props.Text({
      name: "Column 7 Label",
      defaultValue: "Column 7",
      group: "Column 7",
      tooltip: "Display label for seventh column header"
    }),
    column7Visible: props.Visibility({
      name: "Column 7 Visible",
      group: "Column 7",
      tooltip: "Show or hide the seventh column"
    }),
    column8Key: props.Text({
      name: "Column 8 Key",
      defaultValue: "",
      group: "Column 8",
      tooltip: "JSON key for eighth column data"
    }),
    column8Label: props.Text({
      name: "Column 8 Label",
      defaultValue: "Column 8",
      group: "Column 8",
      tooltip: "Display label for eighth column header"
    }),
    column8Visible: props.Visibility({
      name: "Column 8 Visible",
      group: "Column 8",
      tooltip: "Show or hide the eighth column"
    }),
    column9Key: props.Text({
      name: "Column 9 Key",
      defaultValue: "",
      group: "Column 9",
      tooltip: "JSON key for ninth column data"
    }),
    column9Label: props.Text({
      name: "Column 9 Label",
      defaultValue: "Column 9",
      group: "Column 9",
      tooltip: "Display label for ninth column header"
    }),
    column9Visible: props.Visibility({
      name: "Column 9 Visible",
      group: "Column 9",
      tooltip: "Show or hide the ninth column"
    }),
    column10Key: props.Text({
      name: "Column 10 Key",
      defaultValue: "",
      group: "Column 10",
      tooltip: "JSON key for tenth column data"
    }),
    column10Label: props.Text({
      name: "Column 10 Label",
      defaultValue: "Column 10",
      group: "Column 10",
      tooltip: "Display label for tenth column header"
    }),
    column10Visible: props.Visibility({
      name: "Column 10 Visible",
      group: "Column 10",
      tooltip: "Show or hide the tenth column"
    }),
  },
});