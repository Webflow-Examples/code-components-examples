import ToggleSwitch from "./ToggleSwitch";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import "./ToggleSwitch.css";

export default declareComponent(ToggleSwitch, {
  name: "ToggleSwitch",
  description: "A switch/toggle component for on/off boolean states. Displays as a horizontal track with a circular sliding thumb that animates smoothly between left (off) and right (on) positions. Includes a label that can be positioned to the left or right of the switch, with optional description text below the label. Supports three sizes (small, medium, large) that scale the track, thumb, and typography. Features a disabled state that grays out the component and prevents interaction. The on state uses a configurable accent color via CSS variable. Includes a visible focus ring for keyboard accessibility. Optionally displays on/off icons inside the thumb circle.",
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
    size: props.Variant({
      name: "Size",
      options: ["small", "medium", "large"],
      defaultValue: "medium",
      group: "Style",
      tooltip: "Controls the size of the switch, thumb, and text"
    }),
    labelPosition: props.Variant({
      name: "Label Position",
      options: ["left", "right"],
      defaultValue: "left",
      group: "Style",
      tooltip: "Position of the label text relative to the switch"
    }),
    label: props.TextNode({
      name: "Label",
      defaultValue: "Enable notifications",
      group: "Content",
      tooltip: "Main label text displayed next to the switch"
    }),
    description: props.Text({
      name: "Description",
      defaultValue: "Receive email updates about your account",
      group: "Content",
      tooltip: "Optional helper text displayed below the label"
    }),
    defaultChecked: props.Boolean({
      name: "Default Checked",
      defaultValue: false,
      group: "Behavior",
      tooltip: "Initial on/off state when the component loads"
    }),
    isDisabled: props.Boolean({
      name: "Disabled",
      defaultValue: false,
      group: "Behavior",
      tooltip: "Disable the switch and prevent user interaction"
    }),
    showIcons: props.Boolean({
      name: "Show Icons",
      defaultValue: false,
      group: "Style",
      tooltip: "Display checkmark and X icons inside the thumb"
    }),
    showDescription: props.Visibility({
      name: "Show Description",
      group: "Display",
      tooltip: "Toggle visibility of the description text"
    })
  }
});