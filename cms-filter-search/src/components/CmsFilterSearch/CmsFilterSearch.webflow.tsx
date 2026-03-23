import CmsFilterSearch from "./CmsFilterSearch";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import "./CmsFilterSearch.css";

export default declareComponent(CmsFilterSearch, {
  name: "CmsFilterSearch",
  description: "A comprehensive CMS filter and search component for displaying and filtering collection items as cards. Features a search input that filters items by title and description, category filter buttons/chips for quick filtering, and a grid/list view toggle. Displays active filter indicators and item count. Each item card shows an image, title, description, and category tag. Includes smooth animated transitions when filtering and an empty state message when no items match the current filters. Cards arrange in a responsive grid that stacks on mobile, or as a vertical list depending on view mode.",
  group: "Interactive",
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
    viewMode: props.Variant({
      name: "View Mode",
      options: ["grid", "list"],
      defaultValue: "grid",
      group: "Style",
      tooltip: "Default view mode for items display"
    }),
    gridColumns: props.Variant({
      name: "Grid Columns",
      options: ["2", "3", "4"],
      defaultValue: "3",
      group: "Style",
      tooltip: "Number of columns in grid view"
    }),
    heading: props.TextNode({
      name: "Heading",
      defaultValue: "Browse Our Collection",
      group: "Content",
      tooltip: "Main heading above the filter controls"
    }),
    searchPlaceholder: props.Text({
      name: "Search Placeholder",
      defaultValue: "Search by title or description...",
      group: "Content",
      tooltip: "Placeholder text for search input"
    }),
    categoryFilterLabel: props.Text({
      name: "Category Filter Label",
      defaultValue: "Filter by category:",
      group: "Content",
      tooltip: "Label text for category filter section"
    }),
    allCategoriesText: props.Text({
      name: "All Categories Text",
      defaultValue: "All",
      group: "Content",
      tooltip: "Text for the 'All' category filter button"
    }),
    itemCountText: props.Text({
      name: "Item Count Text",
      defaultValue: "Showing {count} items",
      group: "Content",
      tooltip: "Text template for item count (use {count} as placeholder)"
    }),
    emptyStateHeading: props.Text({
      name: "Empty State Heading",
      defaultValue: "No items found",
      group: "Content",
      tooltip: "Heading shown when no items match filters"
    }),
    emptyStateMessage: props.Text({
      name: "Empty State Message",
      defaultValue: "Try adjusting your search or filters to find what you're looking for.",
      group: "Content",
      tooltip: "Message shown when no items match filters"
    }),
    clearFiltersText: props.Text({
      name: "Clear Filters Text",
      defaultValue: "Clear all filters",
      group: "Content",
      tooltip: "Text for clear filters button"
    }),
    showViewToggle: props.Boolean({
      name: "Show View Toggle",
      defaultValue: true,
      group: "Display",
      tooltip: "Show or hide the grid/list view toggle"
    }),
    showItemCount: props.Boolean({
      name: "Show Item Count",
      defaultValue: true,
      group: "Display",
      tooltip: "Show or hide the item count display"
    }),
    showCategoryFilters: props.Boolean({
      name: "Show Category Filters",
      defaultValue: true,
      group: "Display",
      tooltip: "Show or hide category filter buttons"
    }),
    enableAnimations: props.Boolean({
      name: "Enable Animations",
      defaultValue: true,
      group: "Behavior",
      tooltip: "Enable animated transitions when filtering"
    }),
    item1Visible: props.Visibility({
      name: "Item 1 Visible",
      group: "Item 1",
      tooltip: "Show or hide the first item"
    }),
    item1Image: props.Image({
      name: "Item 1 Image",
      group: "Item 1",
      tooltip: "First item card image"
    }),
    item1Title: props.Text({
      name: "Item 1 Title",
      defaultValue: "Product Design Workshop",
      group: "Item 1",
      tooltip: "First item card title"
    }),
    item1Description: props.Text({
      name: "Item 1 Description",
      defaultValue: "Learn the fundamentals of product design with hands-on exercises and real-world examples.",
      group: "Item 1",
      tooltip: "First item card description"
    }),
    item1Category: props.Text({
      name: "Item 1 Category",
      defaultValue: "Design",
      group: "Item 1",
      tooltip: "First item category tag"
    }),
    item1Link: props.Link({
      name: "Item 1 Link",
      group: "Item 1",
      tooltip: "First item card link"
    }),
    item2Visible: props.Visibility({
      name: "Item 2 Visible",
      group: "Item 2",
      tooltip: "Show or hide the second item"
    }),
    item2Image: props.Image({
      name: "Item 2 Image",
      group: "Item 2",
      tooltip: "Second item card image"
    }),
    item2Title: props.Text({
      name: "Item 2 Title",
      defaultValue: "Advanced JavaScript Patterns",
      group: "Item 2",
      tooltip: "Second item card title"
    }),
    item2Description: props.Text({
      name: "Item 2 Description",
      defaultValue: "Master advanced JavaScript concepts including closures, prototypes, and async programming.",
      group: "Item 2",
      tooltip: "Second item card description"
    }),
    item2Category: props.Text({
      name: "Item 2 Category",
      defaultValue: "Development",
      group: "Item 2",
      tooltip: "Second item category tag"
    }),
    item2Link: props.Link({
      name: "Item 2 Link",
      group: "Item 2",
      tooltip: "Second item card link"
    }),
    item3Visible: props.Visibility({
      name: "Item 3 Visible",
      group: "Item 3",
      tooltip: "Show or hide the third item"
    }),
    item3Image: props.Image({
      name: "Item 3 Image",
      group: "Item 3",
      tooltip: "Third item card image"
    }),
    item3Title: props.Text({
      name: "Item 3 Title",
      defaultValue: "Content Marketing Strategy",
      group: "Item 3",
      tooltip: "Third item card title"
    }),
    item3Description: props.Text({
      name: "Item 3 Description",
      defaultValue: "Build a comprehensive content marketing strategy that drives engagement and conversions.",
      group: "Item 3",
      tooltip: "Third item card description"
    }),
    item3Category: props.Text({
      name: "Item 3 Category",
      defaultValue: "Marketing",
      group: "Item 3",
      tooltip: "Third item category tag"
    }),
    item3Link: props.Link({
      name: "Item 3 Link",
      group: "Item 3",
      tooltip: "Third item card link"
    }),
    item4Visible: props.Visibility({
      name: "Item 4 Visible",
      group: "Item 4",
      tooltip: "Show or hide the fourth item"
    }),
    item4Image: props.Image({
      name: "Item 4 Image",
      group: "Item 4",
      tooltip: "Fourth item card image"
    }),
    item4Title: props.Text({
      name: "Item 4 Title",
      defaultValue: "Data Analytics Fundamentals",
      group: "Item 4",
      tooltip: "Fourth item card title"
    }),
    item4Description: props.Text({
      name: "Item 4 Description",
      defaultValue: "Understand how to collect, analyze, and visualize data to make informed business decisions.",
      group: "Item 4",
      tooltip: "Fourth item card description"
    }),
    item4Category: props.Text({
      name: "Item 4 Category",
      defaultValue: "Analytics",
      group: "Item 4",
      tooltip: "Fourth item category tag"
    }),
    item4Link: props.Link({
      name: "Item 4 Link",
      group: "Item 4",
      tooltip: "Fourth item card link"
    }),
    item5Visible: props.Visibility({
      name: "Item 5 Visible",
      group: "Item 5",
      tooltip: "Show or hide the fifth item"
    }),
    item5Image: props.Image({
      name: "Item 5 Image",
      group: "Item 5",
      tooltip: "Fifth item card image"
    }),
    item5Title: props.Text({
      name: "Item 5 Title",
      defaultValue: "Brand Identity Design",
      group: "Item 5",
      tooltip: "Fifth item card title"
    }),
    item5Description: props.Text({
      name: "Item 5 Description",
      defaultValue: "Create cohesive brand identities that resonate with your target audience and stand out.",
      group: "Item 5",
      tooltip: "Fifth item card description"
    }),
    item5Category: props.Text({
      name: "Item 5 Category",
      defaultValue: "Design",
      group: "Item 5",
      tooltip: "Fifth item category tag"
    }),
    item5Link: props.Link({
      name: "Item 5 Link",
      group: "Item 5",
      tooltip: "Fifth item card link"
    }),
    item6Visible: props.Visibility({
      name: "Item 6 Visible",
      group: "Item 6",
      tooltip: "Show or hide the sixth item"
    }),
    item6Image: props.Image({
      name: "Item 6 Image",
      group: "Item 6",
      tooltip: "Sixth item card image"
    }),
    item6Title: props.Text({
      name: "Item 6 Title",
      defaultValue: "React Performance Optimization",
      group: "Item 6",
      tooltip: "Sixth item card title"
    }),
    item6Description: props.Text({
      name: "Item 6 Description",
      defaultValue: "Learn techniques to optimize React applications for maximum performance and user experience.",
      group: "Item 6",
      tooltip: "Sixth item card description"
    }),
    item6Category: props.Text({
      name: "Item 6 Category",
      defaultValue: "Development",
      group: "Item 6",
      tooltip: "Sixth item category tag"
    }),
    item6Link: props.Link({
      name: "Item 6 Link",
      group: "Item 6",
      tooltip: "Sixth item card link"
    }),
  },
});