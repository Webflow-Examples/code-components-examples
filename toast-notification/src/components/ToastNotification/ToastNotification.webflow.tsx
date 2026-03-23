import ToastNotification from "./ToastNotification";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import "./ToastNotification.css";

export default declareComponent(ToastNotification, {
  name: "ToastNotification",
  description: "A toast notification system that displays temporary messages in a configurable screen corner (top-right, top-left, bottom-right, bottom-left). Each toast card features a colored left border and icon matching the variant (success with green checkmark, error with red X, warning with yellow exclamation, info with blue info icon), followed by a bold message title and optional lighter description text below. A close button (X) appears on the right. A progress bar animates along the bottom edge, depleting over the auto-dismiss duration. Toasts stack vertically with 12px gaps, slide in smoothly from their corner direction, and fade out when dismissed. Maximum 5 toasts visible simultaneously; oldest auto-dismiss when the limit is exceeded. Fully responsive with appropriate padding and max-width constraints.",
  group: "Interactive",
  options: {
    ssr: false,
    applyTagSelectors: true
  },
  props: {
    id: props.Id({
      name: "Element ID",
      group: "Settings",
      tooltip: "HTML ID attribute for the toast container"
    }),
    position: props.Variant({
      name: "Position",
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
      defaultValue: "top-right",
      group: "Style",
      tooltip: "Screen corner position where toasts appear"
    }),
    variant: props.Variant({
      name: "Variant",
      options: ["success", "error", "warning", "info"],
      defaultValue: "info",
      group: "Style",
      tooltip: "Visual style and color scheme of the toast"
    }),
    message: props.TextNode({
      name: "Message",
      defaultValue: "Notification message",
      group: "Content",
      tooltip: "Primary message text displayed prominently"
    }),
    description: props.Text({
      name: "Description",
      defaultValue: "Additional details about this notification",
      group: "Content",
      tooltip: "Optional secondary description text below the message"
    }),
    showDescription: props.Visibility({
      name: "Show Description",
      group: "Display",
      tooltip: "Show or hide the description text"
    }),
    duration: props.Number({
      name: "Duration",
      defaultValue: 5000,
      group: "Behavior",
      tooltip: "Auto-dismiss duration in milliseconds"
    }),
    showProgressBar: props.Boolean({
      name: "Show Progress Bar",
      defaultValue: true,
      group: "Display",
      tooltip: "Display animated progress bar showing time until auto-dismiss"
    }),
    showCloseButton: props.Boolean({
      name: "Show Close Button",
      defaultValue: true,
      group: "Display",
      tooltip: "Display close button for manual dismissal"
    }),
    maxToasts: props.Number({
      name: "Max Toasts",
      defaultValue: 5,
      group: "Behavior",
      tooltip: "Maximum number of toasts visible simultaneously"
    }),
    enableAnimations: props.Boolean({
      name: "Enable Animations",
      defaultValue: true,
      group: "Behavior",
      tooltip: "Enable smooth slide and fade animations"
    }),
    toast1Message: props.Text({
      name: "Toast 1 Message",
      defaultValue: "Changes saved successfully",
      group: "Demo Toast 1",
      tooltip: "Message text for first demo toast"
    }),
    toast1Description: props.Text({
      name: "Toast 1 Description",
      defaultValue: "Your profile has been updated",
      group: "Demo Toast 1",
      tooltip: "Description text for first demo toast"
    }),
    toast1Variant: props.Variant({
      name: "Toast 1 Variant",
      options: ["success", "error", "warning", "info"],
      defaultValue: "success",
      group: "Demo Toast 1",
      tooltip: "Variant style for first demo toast"
    }),
    toast1Visible: props.Visibility({
      name: "Toast 1 Visible",
      group: "Demo Toast 1",
      tooltip: "Show or hide the first demo toast"
    }),
    toast2Message: props.Text({
      name: "Toast 2 Message",
      defaultValue: "Connection error",
      group: "Demo Toast 2",
      tooltip: "Message text for second demo toast"
    }),
    toast2Description: props.Text({
      name: "Toast 2 Description",
      defaultValue: "Unable to reach the server",
      group: "Demo Toast 2",
      tooltip: "Description text for second demo toast"
    }),
    toast2Variant: props.Variant({
      name: "Toast 2 Variant",
      options: ["success", "error", "warning", "info"],
      defaultValue: "error",
      group: "Demo Toast 2",
      tooltip: "Variant style for second demo toast"
    }),
    toast2Visible: props.Visibility({
      name: "Toast 2 Visible",
      group: "Demo Toast 2",
      tooltip: "Show or hide the second demo toast"
    }),
    toast3Message: props.Text({
      name: "Toast 3 Message",
      defaultValue: "Storage almost full",
      group: "Demo Toast 3",
      tooltip: "Message text for third demo toast"
    }),
    toast3Description: props.Text({
      name: "Toast 3 Description",
      defaultValue: "You have used 90% of your storage",
      group: "Demo Toast 3",
      tooltip: "Description text for third demo toast"
    }),
    toast3Variant: props.Variant({
      name: "Toast 3 Variant",
      options: ["success", "error", "warning", "info"],
      defaultValue: "warning",
      group: "Demo Toast 3",
      tooltip: "Variant style for third demo toast"
    }),
    toast3Visible: props.Visibility({
      name: "Toast 3 Visible",
      group: "Demo Toast 3",
      tooltip: "Show or hide the third demo toast"
    })
  }
});