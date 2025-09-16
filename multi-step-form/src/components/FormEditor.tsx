import { useState } from "react";
import DynamicFormGenerator from "./DynamicFormGenerator.jsx";

const initialFormConfig = JSON.stringify(
  [
    {
      "Field Name": "first_name",
      Step: "1",
      "User Label": "First Name",
      "Field Type": "Text Box",
      Placeholder: "Enter your name",
      Required: "checked",
      FormID: "contact_form_001",
      "Min Characters": "2",
    },
    {
      "Field Name": "email",
      Step: "1",
      "User Label": "Email Address",
      "Field Type": "Email",
      Placeholder: "you@example.com",
      Required: "checked",
      FormID: "contact_form_001",
      Format: "Email",
    },
    {
      "Field Name": "business_type",
      Step: "2",
      "User Label": "What type of business?",
      "Field Type": "Dropdown",
      Options: "LLC, Corporation, Sole Prop",
      Placeholder: "Select one",
      Required: "checked",
      FormID: "contact_form_001",
    },
    {
      "Field Name": "hear_detail",
      Step: "3",
      "User Label": "Please specify",
      "Field Type": "Text Box",
      Placeholder: "If you chose 'Other'",
      "Show If (Logic/Condition)": "hear_about = 'Other'",
      FormID: "contact_form_001",
    },
    {
      "Field Name": "feedback",
      Step: "4",
      "User Label": "Your Feedback",
      "Field Type": "Textarea",
      Placeholder: "Tell us more...",
      "Show If (Logic/Condition)": "business_type = 'LLC' AND employees > 50",
      FormID: "contact_form_001",
      "Max Characters": "500",
    },
    {
      "Field Name": "hear_about",
      Step: "3",
      "User Label": "How did you hear about us?",
      "Field Type": "Dropdown",
      Options: "Google, Friend, Other",
      FormID: "contact_form_001",
    },
    {
      "Field Name": "employees",
      Step: "2",
      "User Label": "Number of Employees",
      "Field Type": "Number",
      Required: "checked",
      FormID: "contact_form_001",
      "Min Characters": "1",
      "Max Characters": "10,000",
    },
  ],
  null,
  2
);

const FormEditor = () => {
  const [formConfig, setFormConfig] = useState(initialFormConfig);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base-content">
      {/* Left Column: Config Input */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold mb-4 text-base-content">
          Form Config Input
        </h2>
        <textarea
          value={formConfig}
          onChange={(e) => setFormConfig(e.target.value)}
          rows={30}
          className="textarea textarea-bordered w-full flex-grow font-mono bg-base-200 text-base-content border-base-300 focus:border-primary focus:outline-none resize-none"
          placeholder="Enter your form configuration JSON here..."
        />
      </div>

      {/* Right Column: Airtable and Form Preview */}
      <div className="space-y-8">
        {/* Form Preview */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-base-content">
            Live Preview
          </h2>
          <DynamicFormGenerator
            formConfig={formConfig}
            animateCards={true}
            webhookUrl={
              "https://hooks.airtable.com/workflows/v1/genericWebhook/appoSYwCLsZ1KeGDA/wfliqy37E6b8Z6HLj/wtrTVL5b65tnEaYKG"
            }
            devMode={"false"}
            formID={"contact_form_001"}
          />
        </div>
        {/* Airtable Embed */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-base-content">
            Airtable Base
          </h2>
          <iframe
            className="airtable-embed rounded-lg"
            src="https://airtable.com/embed/appoSYwCLsZ1KeGDA/shrjViMqTb4f7apWi/tblU7NMKtT92Cp6iQ/viw2rGomjKKXQ6PNm?blocks=bipbuUkCJrq16WRtW"
            frameBorder="0"
            width="100%"
            height="533"
            style={{ background: "transparent", border: "1px solid #ccc" }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default FormEditor;
