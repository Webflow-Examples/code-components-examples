import Breadcrumbs from "./Breadcrumbs";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import "./Breadcrumbs.css";

export default declareComponent(Breadcrumbs, {
  name: "Breadcrumbs",
  description: "A breadcrumb navigation component that displays a hierarchical path to the current page. Shows a home icon as the first item, followed by up to 6 levels of navigation links separated by a configurable separator (slash, chevron, or arrow). The last item represents the current page and is rendered as non-interactive text. On mobile viewports, middle items collapse into an ellipsis menu, showing only the first and last two items to save space. Each breadcrumb level has configurable label text and URL link properties.",
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
    separator: props.Variant({
      name: "Separator Style",
      options: ["slash", "chevron", "arrow"],
      defaultValue: "chevron",
      group: "Style",
      tooltip: "Visual separator character displayed between breadcrumb items"
    }),
    homeLink: props.Link({
      name: "Home Link",
      group: "Content",
      tooltip: "URL destination for the home icon breadcrumb"
    }),
    level1Label: props.Text({
      name: "Label",
      defaultValue: "Products",
      group: "Level 1",
      tooltip: "Text label for the first breadcrumb level"
    }),
    level1Link: props.Link({
      name: "Link",
      group: "Level 1",
      tooltip: "URL destination for the first breadcrumb level"
    }),
    level1Visible: props.Visibility({
      name: "Visible",
      group: "Level 1",
      tooltip: "Toggle visibility of the first breadcrumb level"
    }),
    level2Label: props.Text({
      name: "Label",
      defaultValue: "Electronics",
      group: "Level 2",
      tooltip: "Text label for the second breadcrumb level"
    }),
    level2Link: props.Link({
      name: "Link",
      group: "Level 2",
      tooltip: "URL destination for the second breadcrumb level"
    }),
    level2Visible: props.Visibility({
      name: "Visible",
      group: "Level 2",
      tooltip: "Toggle visibility of the second breadcrumb level"
    }),
    level3Label: props.Text({
      name: "Label",
      defaultValue: "Laptops",
      group: "Level 3",
      tooltip: "Text label for the third breadcrumb level"
    }),
    level3Link: props.Link({
      name: "Link",
      group: "Level 3",
      tooltip: "URL destination for the third breadcrumb level"
    }),
    level3Visible: props.Visibility({
      name: "Visible",
      group: "Level 3",
      tooltip: "Toggle visibility of the third breadcrumb level"
    }),
    level4Label: props.Text({
      name: "Label",
      defaultValue: "Gaming",
      group: "Level 4",
      tooltip: "Text label for the fourth breadcrumb level"
    }),
    level4Link: props.Link({
      name: "Link",
      group: "Level 4",
      tooltip: "URL destination for the fourth breadcrumb level"
    }),
    level4Visible: props.Visibility({
      name: "Visible",
      group: "Level 4",
      tooltip: "Toggle visibility of the fourth breadcrumb level"
    }),
    level5Label: props.Text({
      name: "Label",
      defaultValue: "High Performance",
      group: "Level 5",
      tooltip: "Text label for the fifth breadcrumb level"
    }),
    level5Link: props.Link({
      name: "Link",
      group: "Level 5",
      tooltip: "URL destination for the fifth breadcrumb level"
    }),
    level5Visible: props.Visibility({
      name: "Visible",
      group: "Level 5",
      tooltip: "Toggle visibility of the fifth breadcrumb level"
    }),
    currentPageLabel: props.TextNode({
      name: "Current Page Label",
      defaultValue: "Gaming Laptop X1",
      group: "Content",
      tooltip: "Text for the current page breadcrumb (non-clickable final item)"
    })
  }
});