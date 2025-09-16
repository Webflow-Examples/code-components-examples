import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import DynamicFormGenerator from "./DynamicFormGenerator";
import "../styles/globals.css";

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
    formName: props.Text({
      name: "Form Name",
      defaultValue: "Dynamic Form",
    }),
    formConfig: props.Text({
      name: "Form Configuration",
      defaultValue: `"[{"Field Name":"first_name","Step":"1","User Label":"First Name","Field Type":"Text Box","Placeholder":"Enter your name","Required":"checked","FormID":"contact-form-001","Min Characters":"2"},{"Field Name":"email","Step":"1","User Label":"Email Address","Field Type":"Email","Placeholder":"you@example.com","Required":"checked","FormID":"contact-form-001","Format":"Email"},{"Field Name":"business_type","Step":"2","User Label":"What type of business?","Field Type":"Dropdown","Options":"LLC, Corporation, Sole Prop","Placeholder":"Select one","Required":"checked","FormID":"contact-form-001"},{"Field Name":"hear_detail","Step":"3","User Label":"Please specify","Field Type":"Text Box","Placeholder":"If you chose 'Other'","Show If (Logic/Condition)":"hear_about = 'Other'","FormID":"contact-form-001"},{"Field Name":"feedback","Step":"4","User Label":"Your Feedback","Field Type":"Textarea","Placeholder":"Tell us more...","Show If (Logic/Condition)":"business_type = 'LLC' AND employees > 50","FormID":"contact-form-001","Max Characters":"500"},{"Field Name":"hear_about","Step":"3","User Label":"How did you hear about us?","Field Type":"Dropdown","Options":"Google, Friend, Other","FormID":"contact-form-001"},{"Field Name":"employees","Step":"2","User Label":"Number of Employees","Field Type":"Number","Required":"checked","FormID":"contact-form-001","Min Characters":"1","Max Characters":"10,000"}]"`,
    }),
    webhookUrl: props.Text({
      name: "Webhook URL",
      defaultValue:
        "https://hooks.airtable.com/workflows/v1/genericWebhook/appoSYwCLsZ1KeGDA/wfliqy37E6b8Z6HLj/wtrTVL5b65tnEaYKG",
    }),
    formID: props.Text({
      name: "Form ID",
      defaultValue: "contact_form_001",
    }),
    devMode: props.Variant({
      name: "Dev Mode",
      options: ["false", "true"],
    }),
  },
});
