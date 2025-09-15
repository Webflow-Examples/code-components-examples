import * as React from "react";
import * as Types from "./types";

declare function DynamicFormGenerator(props: {
  as?: React.ElementType;
  animateCards?: Types.Boolean.Boolean;
  formName?: Types.Builtin.Text;
  formConfiguration?: Types.Builtin.Text;
  webhookUrl?: Types.Builtin.Text;
  formId?: Types.Builtin.Text;
  devMode?: "false" | "true";
}): React.JSX.Element;
