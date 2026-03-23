import ProgressStepper from "./ProgressStepper";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import "./ProgressStepper.css";

export default declareComponent(ProgressStepper, {
  name: "ProgressStepper",
  description: "A multi-step progress indicator that visually tracks user progress through a sequential process. Displays numbered circles connected by horizontal or vertical lines, with completed steps showing checkmarks, the current step highlighted with an accent color, and future steps dimmed. Each step includes a label and optional description text. Supports 3-8 configurable steps with individual visibility controls. Offers a clickable variant that allows navigation to previously completed steps. Automatically switches from horizontal to vertical layout on mobile devices for optimal responsive behavior.",
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
    orientation: props.Variant({
      name: "Orientation",
      options: ["horizontal", "vertical"],
      defaultValue: "horizontal",
      group: "Style",
      tooltip: "Layout direction of the stepper"
    }),
    clickable: props.Boolean({
      name: "Clickable",
      defaultValue: false,
      group: "Behavior",
      tooltip: "Allow clicking on completed steps to navigate back"
    }),
    currentStep: props.Number({
      name: "Current Step",
      defaultValue: 1,
      group: "Behavior",
      tooltip: "The currently active step number (1-based index)"
    }),
    totalSteps: props.Number({
      name: "Total Steps",
      defaultValue: 4,
      group: "Settings",
      tooltip: "Total number of steps to display (3-8)"
    }),
    step1Label: props.Text({
      name: "Label",
      defaultValue: "Account Setup",
      group: "Step 1",
      tooltip: "Label text for step 1"
    }),
    step1Description: props.Text({
      name: "Description",
      defaultValue: "Create your account",
      group: "Step 1",
      tooltip: "Optional description text for step 1"
    }),
    step1Visible: props.Visibility({
      name: "Visible",
      group: "Step 1",
      tooltip: "Show or hide step 1"
    }),
    step2Label: props.Text({
      name: "Label",
      defaultValue: "Personal Info",
      group: "Step 2",
      tooltip: "Label text for step 2"
    }),
    step2Description: props.Text({
      name: "Description",
      defaultValue: "Enter your details",
      group: "Step 2",
      tooltip: "Optional description text for step 2"
    }),
    step2Visible: props.Visibility({
      name: "Visible",
      group: "Step 2",
      tooltip: "Show or hide step 2"
    }),
    step3Label: props.Text({
      name: "Label",
      defaultValue: "Payment",
      group: "Step 3",
      tooltip: "Label text for step 3"
    }),
    step3Description: props.Text({
      name: "Description",
      defaultValue: "Add payment method",
      group: "Step 3",
      tooltip: "Optional description text for step 3"
    }),
    step3Visible: props.Visibility({
      name: "Visible",
      group: "Step 3",
      tooltip: "Show or hide step 3"
    }),
    step4Label: props.Text({
      name: "Label",
      defaultValue: "Confirmation",
      group: "Step 4",
      tooltip: "Label text for step 4"
    }),
    step4Description: props.Text({
      name: "Description",
      defaultValue: "Review and confirm",
      group: "Step 4",
      tooltip: "Optional description text for step 4"
    }),
    step4Visible: props.Visibility({
      name: "Visible",
      group: "Step 4",
      tooltip: "Show or hide step 4"
    }),
    step5Label: props.Text({
      name: "Label",
      defaultValue: "Preferences",
      group: "Step 5",
      tooltip: "Label text for step 5"
    }),
    step5Description: props.Text({
      name: "Description",
      defaultValue: "Set your preferences",
      group: "Step 5",
      tooltip: "Optional description text for step 5"
    }),
    step5Visible: props.Visibility({
      name: "Visible",
      group: "Step 5",
      tooltip: "Show or hide step 5"
    }),
    step6Label: props.Text({
      name: "Label",
      defaultValue: "Verification",
      group: "Step 6",
      tooltip: "Label text for step 6"
    }),
    step6Description: props.Text({
      name: "Description",
      defaultValue: "Verify your identity",
      group: "Step 6",
      tooltip: "Optional description text for step 6"
    }),
    step6Visible: props.Visibility({
      name: "Visible",
      group: "Step 6",
      tooltip: "Show or hide step 6"
    }),
    step7Label: props.Text({
      name: "Label",
      defaultValue: "Integration",
      group: "Step 7",
      tooltip: "Label text for step 7"
    }),
    step7Description: props.Text({
      name: "Description",
      defaultValue: "Connect your tools",
      group: "Step 7",
      tooltip: "Optional description text for step 7"
    }),
    step7Visible: props.Visibility({
      name: "Visible",
      group: "Step 7",
      tooltip: "Show or hide step 7"
    }),
    step8Label: props.Text({
      name: "Label",
      defaultValue: "Complete",
      group: "Step 8",
      tooltip: "Label text for step 8"
    }),
    step8Description: props.Text({
      name: "Description",
      defaultValue: "Finish setup",
      group: "Step 8",
      tooltip: "Optional description text for step 8"
    }),
    step8Visible: props.Visibility({
      name: "Visible",
      group: "Step 8",
      tooltip: "Show or hide step 8"
    }),
    showDescriptions: props.Boolean({
      name: "Show Descriptions",
      defaultValue: true,
      group: "Display",
      tooltip: "Display description text below step labels"
    })
  }
});