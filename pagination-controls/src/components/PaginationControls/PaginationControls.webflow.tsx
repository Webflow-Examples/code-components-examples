import PaginationControls from "./PaginationControls";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import "./PaginationControls.css";

export default declareComponent(PaginationControls, {
  name: "PaginationControls",
  description: "A flexible pagination component for navigating through pages of content. Displays page numbers with Previous/Next buttons, current page indicator, and total pages count. Supports three visual styles: numbered buttons with ellipsis truncation for many pages (e.g., 1 2 3 ... 18 19 20), simple prev/next arrows only, and a load-more button style. The active page is visually highlighted with accent styling. Previous and Next buttons are automatically disabled at boundaries (first/last page). Includes optional items-per-page display and a compact variant that reduces spacing and button sizes for mobile layouts. Fully responsive with touch-friendly tap targets.",
  group: "Navigation",
  options: {
    ssr: false,
    applyTagSelectors: true
  },
  props: {
    id: props.Id({
      name: "Element ID",
      group: "Settings",
      tooltip: "HTML ID attribute for targeting with CSS or JavaScript"
    }),
    style: props.Variant({
      name: "Pagination Style",
      options: ["numbered", "simple", "loadMore"],
      defaultValue: "numbered",
      group: "Style",
      tooltip: "Visual style of pagination controls"
    }),
    size: props.Variant({
      name: "Size",
      options: ["default", "compact"],
      defaultValue: "default",
      group: "Style",
      tooltip: "Component size variant for different layouts"
    }),
    alignment: props.Variant({
      name: "Alignment",
      options: ["left", "center", "right"],
      defaultValue: "center",
      group: "Style",
      tooltip: "Horizontal alignment of pagination controls"
    }),
    currentPage: props.Number({
      name: "Current Page",
      defaultValue: 1,
      group: "Content",
      tooltip: "Currently active page number"
    }),
    totalPages: props.Number({
      name: "Total Pages",
      defaultValue: 20,
      group: "Content",
      tooltip: "Total number of pages available"
    }),
    itemsPerPage: props.Number({
      name: "Items Per Page",
      defaultValue: 10,
      group: "Content",
      tooltip: "Number of items displayed per page"
    }),
    totalItems: props.Number({
      name: "Total Items",
      defaultValue: 200,
      group: "Content",
      tooltip: "Total number of items across all pages"
    }),
    previousText: props.Text({
      name: "Previous Button Text",
      defaultValue: "Previous",
      group: "Content",
      tooltip: "Text label for Previous button"
    }),
    nextText: props.Text({
      name: "Next Button Text",
      defaultValue: "Next",
      group: "Content",
      tooltip: "Text label for Next button"
    }),
    loadMoreText: props.Text({
      name: "Load More Text",
      defaultValue: "Load More",
      group: "Content",
      tooltip: "Text label for Load More button (loadMore style only)"
    }),
    pageLabel: props.Text({
      name: "Page Label",
      defaultValue: "Page",
      group: "Content",
      tooltip: "Label text before page indicator"
    }),
    ofLabel: props.Text({
      name: "Of Label",
      defaultValue: "of",
      group: "Content",
      tooltip: "Label text between current and total pages"
    }),
    itemsLabel: props.Text({
      name: "Items Label",
      defaultValue: "items",
      group: "Content",
      tooltip: "Label text for items count display"
    }),
    showPageInfo: props.Boolean({
      name: "Show Page Info",
      defaultValue: true,
      group: "Display",
      tooltip: "Display 'Page X of Y' text indicator"
    }),
    showItemsCount: props.Boolean({
      name: "Show Items Count",
      defaultValue: false,
      group: "Display",
      tooltip: "Display items per page and total items count"
    }),
    showFirstLast: props.Boolean({
      name: "Show First/Last Buttons",
      defaultValue: false,
      group: "Display",
      tooltip: "Show First and Last page buttons (numbered style only)"
    }),
    showPreviousNext: props.Boolean({
      name: "Show Previous/Next Buttons",
      defaultValue: true,
      group: "Display",
      tooltip: "Show Previous and Next navigation buttons"
    }),
    maxVisiblePages: props.Number({
      name: "Max Visible Pages",
      defaultValue: 7,
      group: "Behavior",
      tooltip: "Maximum number of page buttons to show before truncating with ellipsis"
    }),
    firstPageText: props.Text({
      name: "First Page Text",
      defaultValue: "First",
      group: "Content",
      tooltip: "Text label for First page button"
    }),
    lastPageText: props.Text({
      name: "Last Page Text",
      defaultValue: "Last",
      group: "Content",
      tooltip: "Text label for Last page button"
    }),
    ariaLabel: props.Text({
      name: "ARIA Label",
      defaultValue: "Pagination Navigation",
      group: "Settings",
      tooltip: "ARIA label for pagination navigation landmark"
    })
  }
});