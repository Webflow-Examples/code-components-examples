import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import DynamicFormGenerator from "./DynamicFormGenerator";
import "../styles/component-styles.css";

// Declare the component
export default declareComponent(DynamicFormGenerator, {
  // Component metadata
  name: "Dynamic Form Generator",
  description:
    "A dynamic form generator that creates multi-step forms from JSON configuration and submits to webhooks",
  group: "Forms",
  options: {
    applyTagSelectors: false, // Disable tag selectors to keep styles independent
  },

  // Prop definitions
  props: {
    animateCards: props.Boolean({
      name: "Animate Cards",
      defaultValue: true,
      trueLabel: "Yes",
      falseLabel: "No",
    }),
    formName: props.Text({
      name: "Form Name",
      defaultValue: "Dynamic Form",
    }),
    formConfig: props.Text({
      name: "Form Configuration",
    }),
    webhookUrl: props.Text({
      name: "Webhook URL",
      defaultValue:
        "https://hooks.airtable.com/workflows/v1/genericWebhook/your-webhook-url",
    }),
    formID: props.Text({
      name: "Form ID",
      defaultValue: "contact-form-001",
    }),
    devMode: props.Variant({
      name: "Dev Mode",
      options: ["false", "true"],
    }),
  },
});
