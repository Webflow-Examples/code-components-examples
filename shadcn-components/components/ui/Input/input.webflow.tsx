import { Input } from "./input";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../../app/globals.css";

export default declareComponent(Input, {
  name: "Input",
  description: "A ShadCN UI input component",
  group: "Form",
  props: {
    className: props.Text({
      name: "Class Name",
      defaultValue: "",
    }),
    type: props.Variant({
      name: "Type",
      options: [
        "text",
        "email",
        "password",
        "number",
        "tel",
        "url",
        "search",
        "date",
        "time",
        "datetime-local",
        "file",
      ],
      defaultValue: "text",
    }),
    placeholder: props.Text({
      name: "Placeholder",
      defaultValue: "Enter text...",
    }),
    disabled: props.Visibility({
      name: "Disabled",
      defaultValue: false,
    }),
    required: props.Visibility({
      name: "Required",
      defaultValue: false,
    }),
    value: props.Text({
      name: "Value",
      defaultValue: "",
    }),
  },
});
