import React, { ReactNode } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "./card";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../app/globals.css";

interface WebflowCardProps {
  className?: string;
  title?: string;
  description?: string;
  content?: ReactNode;
  footerContent?: string;
  showHeader?: boolean;
  showContent?: boolean;
  showFooter?: boolean;
  showAction?: boolean;
  actionContent?: string;
}

const WebflowCard: React.FC<WebflowCardProps> = ({
  className,
  title,
  description,
  content,
  footerContent,
  showHeader = true,
  showContent = true,
  showFooter = false,
  showAction = false,
  actionContent,
}) => {
  return (
    <Card className={className}>
      {showHeader && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
          {showAction && actionContent && (
            <CardAction>{actionContent}</CardAction>
          )}
        </CardHeader>
      )}
      {showContent && content && <CardContent>{content}</CardContent>}
      {showFooter && footerContent && <CardFooter>{footerContent}</CardFooter>}
    </Card>
  );
};

export default declareComponent(WebflowCard, {
  name: "Card",
  description: "A ShadCN UI card component",
  group: "Layout",
  props: {
    className: props.Text({
      name: "Class Name",
      defaultValue: "",
    }),
    title: props.Text({
      name: "Title",
      defaultValue: "Card Title",
      group: "Header",
    }),
    description: props.Text({
      name: "Description",
      defaultValue: "Card description goes here.",
      group: "Header",
    }),
    content: props.RichText({
      name: "Content",
      tooltip: "The content of the card",
      defaultValue: "Card content goes here.",
      group: "Content",
    }),
    footerContent: props.Text({
      name: "Footer Content",
      defaultValue: "Footer content",
      group: "Footer",
    }),
    actionContent: props.Text({
      name: "Action Content",
      defaultValue: "Action",
      group: "Header",
    }),
    showHeader: props.Visibility({
      name: "Show Header",
      defaultValue: true,
      group: "Visibility",
    }),
    showContent: props.Visibility({
      name: "Show Content",
      defaultValue: true,
      group: "Visibility",
    }),
    showFooter: props.Visibility({
      name: "Show Footer",
      defaultValue: false,
      group: "Visibility",
    }),
    showAction: props.Visibility({
      name: "Show Action",
      defaultValue: false,
      group: "Visibility",
    }),
  },
});
