import JobBoard from "./JobBoard";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import "./JobBoard.css";

export default declareComponent(JobBoard, {
  name: "JobBoard",
  description: "A dynamic job board component that fetches and displays open positions from the Greenhouse API. Features a grid layout of job cards, each showing the job title, department, location, and an apply link. Includes interactive department and location filter dropdowns at the top, a loading spinner during data fetch, an error state for failed API calls, and an empty state when no jobs match filters. Supports pagination with a 'Load More' button for large job lists. Cards display in a multi-column grid on desktop and stack vertically on mobile devices. The component connects to any Greenhouse account via a board token prop and handles all API communication, error handling, and responsive layout transitions automatically.",
  group: "Data Display",
  options: {
    ssr: false,
    applyTagSelectors: true
  },
  props: {
    id: props.Id({
      name: "Element ID",
      group: "Settings",
      tooltip: "HTML ID attribute for targeting and accessibility"
    }),
    boardToken: props.Text({
      name: "Board Token",
      defaultValue: "",
      group: "Settings",
      tooltip: "Greenhouse board token for API authentication (from boards-api.greenhouse.io)"
    }),
    heading: props.TextNode({
      name: "Heading",
      defaultValue: "Open Positions",
      group: "Content",
      tooltip: "Main heading displayed at the top of the job board"
    }),
    subheading: props.Text({
      name: "Subheading",
      defaultValue: "Join our team and help us build the future",
      group: "Content",
      tooltip: "Subheading text below the main heading"
    }),
    layout: props.Variant({
      name: "Layout",
      options: ["2-column", "3-column", "4-column"],
      defaultValue: "3-column",
      group: "Style",
      tooltip: "Grid layout columns for job cards on desktop"
    }),
    cardStyle: props.Variant({
      name: "Card Style",
      options: ["elevated", "outlined", "minimal"],
      defaultValue: "elevated",
      group: "Style",
      tooltip: "Visual style of job cards"
    }),
    showFilters: props.Boolean({
      name: "Show Filters",
      defaultValue: true,
      group: "Display",
      tooltip: "Show or hide the department and location filter dropdowns"
    }),
    filterDepartmentLabel: props.Text({
      name: "Department Filter Label",
      defaultValue: "Department",
      group: "Filters",
      tooltip: "Label text for the department filter dropdown"
    }),
    filterLocationLabel: props.Text({
      name: "Location Filter Label",
      defaultValue: "Location",
      group: "Filters",
      tooltip: "Label text for the location filter dropdown"
    }),
    filterAllDepartmentsText: props.Text({
      name: "All Departments Text",
      defaultValue: "All Departments",
      group: "Filters",
      tooltip: "Default option text for all departments in filter"
    }),
    filterAllLocationsText: props.Text({
      name: "All Locations Text",
      defaultValue: "All Locations",
      group: "Filters",
      tooltip: "Default option text for all locations in filter"
    }),
    jobsPerPage: props.Number({
      name: "Jobs Per Page",
      defaultValue: 12,
      group: "Behavior",
      tooltip: "Number of jobs to display per page or load batch"
    }),
    paginationType: props.Variant({
      name: "Pagination Type",
      options: ["load-more", "pagination", "show-all"],
      defaultValue: "load-more",
      group: "Behavior",
      tooltip: "How to handle multiple pages of jobs"
    }),
    loadMoreButtonText: props.Text({
      name: "Load More Button Text",
      defaultValue: "Load More Jobs",
      group: "Pagination",
      tooltip: "Text for the Load More button"
    }),
    previousButtonText: props.Text({
      name: "Previous Button Text",
      defaultValue: "Previous",
      group: "Pagination",
      tooltip: "Text for the previous page button (pagination mode)"
    }),
    nextButtonText: props.Text({
      name: "Next Button Text",
      defaultValue: "Next",
      group: "Pagination",
      tooltip: "Text for the next page button (pagination mode)"
    }),
    applyButtonText: props.Text({
      name: "Apply Button Text",
      defaultValue: "Apply Now",
      group: "Job Cards",
      tooltip: "Text for the apply button on each job card"
    }),
    departmentLabelText: props.Text({
      name: "Department Label",
      defaultValue: "Department:",
      group: "Job Cards",
      tooltip: "Label prefix for department on job cards"
    }),
    locationLabelText: props.Text({
      name: "Location Label",
      defaultValue: "Location:",
      group: "Job Cards",
      tooltip: "Label prefix for location on job cards"
    }),
    showDepartmentOnCard: props.Boolean({
      name: "Show Department",
      defaultValue: true,
      group: "Job Cards",
      tooltip: "Display department information on job cards"
    }),
    showLocationOnCard: props.Boolean({
      name: "Show Location",
      defaultValue: true,
      group: "Job Cards",
      tooltip: "Display location information on job cards"
    }),
    openInNewTab: props.Boolean({
      name: "Open in New Tab",
      defaultValue: true,
      group: "Behavior",
      tooltip: "Open job application links in a new browser tab"
    }),
    loadingText: props.Text({
      name: "Loading Text",
      defaultValue: "Loading open positions...",
      group: "Loading State",
      tooltip: "Text displayed during initial data loading"
    }),
    showLoadingSpinner: props.Boolean({
      name: "Show Loading Spinner",
      defaultValue: true,
      group: "Loading State",
      tooltip: "Show animated spinner during loading"
    }),
    errorHeading: props.Text({
      name: "Error Heading",
      defaultValue: "Unable to Load Jobs",
      group: "Error State",
      tooltip: "Heading text for error state"
    }),
    errorMessage: props.Text({
      name: "Error Message",
      defaultValue: "We're having trouble loading our open positions. Please try again later or contact us directly.",
      group: "Error State",
      tooltip: "Error message text when API call fails"
    }),
    retryButtonText: props.Text({
      name: "Retry Button Text",
      defaultValue: "Try Again",
      group: "Error State",
      tooltip: "Text for retry button in error state"
    }),
    showRetryButton: props.Boolean({
      name: "Show Retry Button",
      defaultValue: true,
      group: "Error State",
      tooltip: "Show retry button in error state"
    }),
    emptyStateHeading: props.Text({
      name: "Empty State Heading",
      defaultValue: "No Positions Available",
      group: "Empty State",
      tooltip: "Heading text when no jobs are found"
    }),
    emptyStateMessage: props.Text({
      name: "Empty State Message",
      defaultValue: "There are no open positions matching your criteria at this time. Check back soon or adjust your filters.",
      group: "Empty State",
      tooltip: "Message text when no jobs match current filters"
    }),
    resultsCountText: props.Text({
      name: "Results Count Text",
      defaultValue: "{count} positions found",
      group: "Content",
      tooltip: "Text template for showing job count (use {count} as placeholder)"
    }),
    showResultsCount: props.Boolean({
      name: "Show Results Count",
      defaultValue: true,
      group: "Display",
      tooltip: "Display the total number of jobs found"
    }),
    cacheTimeout: props.Number({
      name: "Cache Timeout",
      defaultValue: 5,
      group: "Behavior",
      tooltip: "API response cache duration in minutes (0 to disable)"
    }),
  },
});