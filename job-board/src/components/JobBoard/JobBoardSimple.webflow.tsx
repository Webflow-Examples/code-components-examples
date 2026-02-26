import JobBoard from "./JobBoard";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import "./JobBoard.css";

export default declareComponent(JobBoard, {
  name: "JobBoard (Simple)",
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
    showFilters: props.Boolean({
      name: "Show Filters",
      defaultValue: true,
      group: "Display",
      tooltip: "Show or hide the department and location filter dropdowns"
    }),
    applyButtonText: props.Text({
      name: "Apply Button Text",
      defaultValue: "Apply Now",
      group: "Job Cards",
      tooltip: "Text for the apply button on each job card"
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
    showResultsCount: props.Boolean({
      name: "Show Results Count",
      defaultValue: true,
      group: "Display",
      tooltip: "Display the total number of jobs found"
    }),
  },
});