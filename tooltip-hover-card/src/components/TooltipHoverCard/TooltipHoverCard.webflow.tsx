import TooltipHoverCard from "./TooltipHoverCard";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import "./TooltipHoverCard.css";

export default declareComponent(TooltipHoverCard, {
  name: "TooltipHoverCard",
  description: "A versatile tooltip and hover card component that displays contextual information when hovering over or focusing on a trigger element. Supports two modes: simple plain text tooltips and rich hover cards with title, description, and optional image. Features configurable placement (top, bottom, left, right) with automatic viewport edge detection and flip behavior. Includes a visual arrow pointer that dynamically adjusts to point at the trigger element. Appears after a configurable hover delay and smoothly fades in/out with CSS transitions. Fully keyboard accessible with focus state support for screen readers and keyboard navigation.",
  group: "Interactive",
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
    mode: props.Variant({
      name: "Display Mode",
      options: ["tooltip", "hoverCard"],
      defaultValue: "tooltip",
      group: "Style",
      tooltip: "Choose between simple text tooltip or rich hover card with image and formatted content"
    }),
    theme: props.Variant({
      name: "Theme",
      options: ["dark", "light"],
      defaultValue: "dark",
      group: "Style",
      tooltip: "Visual theme for the tooltip/card background and text colors"
    }),
    placement: props.Variant({
      name: "Placement",
      options: ["top", "bottom", "left", "right"],
      defaultValue: "top",
      group: "Style",
      tooltip: "Preferred position relative to trigger element (auto-flips if near viewport edge)"
    }),
    triggerText: props.TextNode({
      name: "Trigger Text",
      defaultValue: "Hover me",
      group: "Content",
      tooltip: "Text displayed on the trigger button"
    }),
    tooltipText: props.Text({
      name: "Tooltip Text",
      defaultValue: "This is helpful information",
      group: "Content",
      tooltip: "Plain text content shown in tooltip mode"
    }),
    cardTitle: props.Text({
      name: "Card Title",
      defaultValue: "More Information",
      group: "Hover Card",
      tooltip: "Heading text displayed at the top of hover card"
    }),
    cardDescription: props.RichText({
      name: "Card Description",
      defaultValue: "This hover card provides detailed contextual information with formatting support for better readability.",
      group: "Hover Card",
      tooltip: "Rich text content with formatting support for hover card body"
    }),
    cardImage: props.Image({
      name: "Card Image",
      group: "Hover Card",
      tooltip: "Optional image displayed at the top of hover card"
    }),
    showCardImage: props.Visibility({
      name: "Show Card Image",
      group: "Hover Card",
      tooltip: "Toggle visibility of the hover card image"
    }),
    hoverDelay: props.Number({
      name: "Hover Delay",
      defaultValue: 200,
      group: "Behavior",
      tooltip: "Delay in milliseconds before tooltip appears on hover"
    }),
    showArrow: props.Boolean({
      name: "Show Arrow",
      defaultValue: true,
      group: "Style",
      tooltip: "Display arrow pointer connecting tooltip to trigger element"
    }),
    autoFlip: props.Boolean({
      name: "Auto Flip",
      defaultValue: true,
      group: "Behavior",
      tooltip: "Automatically flip placement when tooltip would overflow viewport edges"
    }),
    maxWidth: props.Number({
      name: "Max Width",
      defaultValue: 300,
      group: "Style",
      tooltip: "Maximum width of tooltip/card content in pixels"
    }),
    ariaLabel: props.Text({
      name: "ARIA Label",
      defaultValue: "Additional information",
      group: "Settings",
      tooltip: "Accessible label for screen readers describing the tooltip purpose"
    })
  }
});