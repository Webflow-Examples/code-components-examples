import AvatarGroup from "./AvatarGroup";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import "./AvatarGroup.css";

export default declareComponent(AvatarGroup, {
  name: "AvatarGroup",
  description: "A flexible avatar component that displays user profile images in circular containers with configurable sizes (small, medium, large, extra-large). When no image is provided, automatically generates initials from a name prop with a colored background. Supports both single avatar and group modes, where group mode overlaps multiple avatars horizontally with configurable overlap spacing. When the group exceeds a maximum count, displays a '+N' overflow indicator. Features an optional status indicator dot (online green, offline gray, busy red) positioned at the bottom-right corner. Includes optional border ring styling for enhanced visual separation.",
  group: "Content",
  options: {
    ssr: false,
    applyTagSelectors: false
  },
  props: {
    id: props.Id({
      name: "Element ID",
      group: "Settings",
      tooltip: "HTML ID attribute for targeting with CSS or JavaScript"
    }),
    mode: props.Variant({
      name: "Display Mode",
      options: ["single", "group"],
      defaultValue: "single",
      group: "Style",
      tooltip: "Single: shows only Avatar 1. Group: shows all visible avatars up to Max Count."
    }),
    size: props.Variant({
      name: "Size",
      options: ["small", "medium", "large", "extra-large"],
      defaultValue: "medium",
      group: "Style",
      tooltip: "Avatar size variant"
    }),
    showBorder: props.Boolean({
      name: "Show Border",
      defaultValue: false,
      group: "Style",
      tooltip: "Show border ring around avatars"
    }),
    overlapAmount: props.Variant({
      name: "Overlap Amount",
      options: ["none", "small", "medium", "large"],
      defaultValue: "medium",
      group: "Style",
      tooltip: "Amount of overlap between avatars in group mode"
    }),
    maxCount: props.Number({
      name: "Max Count",
      defaultValue: 4,
      group: "Behavior",
      tooltip: "Maximum number of avatars to show before displaying overflow indicator"
    }),
    avatar1Image: props.Image({
      name: "Image",
      group: "Avatar 1",
      tooltip: "First avatar image URL"
    }),
    avatar1Name: props.Text({
      name: "Name",
      defaultValue: "John Doe",
      group: "Avatar 1",
      tooltip: "First avatar name for initials fallback"
    }),
    avatar1Status: props.Variant({
      name: "Status",
      options: ["none", "online", "offline", "busy"],
      defaultValue: "none",
      group: "Avatar 1",
      tooltip: "First avatar status indicator"
    }),
    avatar1Visible: props.Visibility({
      name: "Visible",
      group: "Avatar 1",
      tooltip: "Show or hide this avatar (in Group mode only)"
    }),
    avatar2Image: props.Image({
      name: "Image",
      group: "Avatar 2",
      tooltip: "Second avatar image URL"
    }),
    avatar2Name: props.Text({
      name: "Name",
      defaultValue: "Jane Smith",
      group: "Avatar 2",
      tooltip: "Second avatar name for initials fallback"
    }),
    avatar2Status: props.Variant({
      name: "Status",
      options: ["none", "online", "offline", "busy"],
      defaultValue: "none",
      group: "Avatar 2",
      tooltip: "Second avatar status indicator"
    }),
    avatar2Visible: props.Visibility({
      name: "Visible",
      group: "Avatar 2",
      tooltip: "Show or hide this avatar (in Group mode only)"
    }),
    avatar3Image: props.Image({
      name: "Image",
      group: "Avatar 3",
      tooltip: "Third avatar image URL"
    }),
    avatar3Name: props.Text({
      name: "Name",
      defaultValue: "Mike Johnson",
      group: "Avatar 3",
      tooltip: "Third avatar name for initials fallback"
    }),
    avatar3Status: props.Variant({
      name: "Status",
      options: ["none", "online", "offline", "busy"],
      defaultValue: "none",
      group: "Avatar 3",
      tooltip: "Third avatar status indicator"
    }),
    avatar3Visible: props.Visibility({
      name: "Visible",
      group: "Avatar 3",
      tooltip: "Show or hide this avatar (in Group mode only)"
    }),
    avatar4Image: props.Image({
      name: "Image",
      group: "Avatar 4",
      tooltip: "Fourth avatar image URL"
    }),
    avatar4Name: props.Text({
      name: "Name",
      defaultValue: "Sarah Williams",
      group: "Avatar 4",
      tooltip: "Fourth avatar name for initials fallback"
    }),
    avatar4Status: props.Variant({
      name: "Status",
      options: ["none", "online", "offline", "busy"],
      defaultValue: "none",
      group: "Avatar 4",
      tooltip: "Fourth avatar status indicator"
    }),
    avatar4Visible: props.Visibility({
      name: "Visible",
      group: "Avatar 4",
      tooltip: "Show or hide this avatar (in Group mode only)"
    }),
    avatar5Image: props.Image({
      name: "Image",
      group: "Avatar 5",
      tooltip: "Fifth avatar image URL"
    }),
    avatar5Name: props.Text({
      name: "Name",
      defaultValue: "David Brown",
      group: "Avatar 5",
      tooltip: "Fifth avatar name for initials fallback"
    }),
    avatar5Status: props.Variant({
      name: "Status",
      options: ["none", "online", "offline", "busy"],
      defaultValue: "none",
      group: "Avatar 5",
      tooltip: "Fifth avatar status indicator"
    }),
    avatar5Visible: props.Visibility({
      name: "Visible",
      group: "Avatar 5",
      tooltip: "Show or hide this avatar (in Group mode only)"
    }),
    totalCount: props.Number({
      name: "Total Count",
      defaultValue: 5,
      group: "Behavior",
      tooltip: "Total number of avatars for overflow calculation (when exceeds maxCount)"
    })
  }
});