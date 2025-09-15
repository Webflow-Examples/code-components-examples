import { useState } from "react";
import DynamicFormGenerator from "./DynamicFormGenerator.jsx";
import "../styles/component-styles.css";

const initialFormConfig = JSON.stringify(
  [
    {
      Step: "1",
      "Field Name": "name",
      "Field Type": "Text Box",
      "User Label": "Full Name",
      Required: "Yes",
      Placeholder: "Enter your full name",
    },
    {
      Step: "1",
      "Field Name": "email",
      "Field Type": "Email",
      "User Label": "Email Address",
      Required: "Yes",
      Placeholder: "your.email@example.com",
    },
    {
      Step: "2",
      "Field Name": "feedback",
      "Field Type": "Textarea",
      "User Label": "Feedback",
      Required: "Yes",
      Placeholder: "Please provide your feedback",
      "Min Characters": "10",
    },
    {
      Step: "2",
      "Field Name": "rating",
      "Field Type": "Rating",
      "User Label": "Rating",
      Required: "Yes",
      "Min Characters": "1",
      "Max Characters": "5",
    },
  ],
  null,
  2
);

const FormEditor = () => {
  const [formConfig, setFormConfig] = useState(initialFormConfig);

  return (
    <div
      style={{ padding: "2rem", display: "flex", gap: "2rem", color: "white" }}
    >
      <style>{`
        .field-textarea {
            width: 100%;
            height: auto;
            font-family: monospace;
            background-color: #1a1a1a;
            color: #f0f0f0;
            border: 1px solid #444;
            border-radius: 0.5rem;
            padding: 1rem;
        }
        .form-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }
      `}</style>
      <div style={{ flex: 1 }}>
        <h2 className="form-title">Form Config Input</h2>
        <textarea
          value={formConfig}
          onChange={(e) => setFormConfig(e.target.value)}
          rows={30}
          className="field-textarea"
        />
      </div>
      <div style={{ flex: 1 }}>
        <DynamicFormGenerator formConfig={formConfig} />
      </div>
    </div>
  );
};

export default FormEditor;
