import React from "react";
import { Alert, AlertTitle, AlertDescription } from "./alert";
import { props } from '@webflow/data-types';
import { declareComponent } from "@webflow/react";

import "../../app/globals.css";

interface WebflowAlertProps {
  className?: string;
  variant?: "default" | "destructive";
  title?: string;
  description?: string;
  showIcon?: boolean;
  iconElement?: React.ReactNode;
}

const WebflowAlert: React.FC<WebflowAlertProps> = ({
  className,
  variant = "default",
  title,
  description,
  showIcon = false,
  iconElement,
}) => {
  return (
    <Alert variant={variant} className={className}>
      {showIcon && iconElement}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
};

export default declareComponent(WebflowAlert, {
  name: "Alert",
  description: "A ShadCN UI alert component",
  group: "Feedback",
  props: {
    className: props.Text({
      name: "Class Name",
      defaultValue: "",
    }),
    variant: props.Variant({
      name: "Variant",
      options: ["default", "destructive"],
      defaultValue: "default",
    }),
    title: props.Text({
      name: "Title",
      defaultValue: "Alert Title",
    }),
    description: props.Text({
      name: "Description", 
      defaultValue: "Your alert description goes here.",
    }),
    showIcon: props.Visibility({
      name: "Show Icon",
      defaultValue: false,
    }),
  },
});
