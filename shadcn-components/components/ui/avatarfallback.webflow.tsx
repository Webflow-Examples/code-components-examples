"use client";

import React from "react";
import { props } from '@webflow/data-types';
import { declareComponent } from "@webflow/react";
import { cn } from "@/lib/utils";

import "../../app/globals.css";

interface WebflowAvatarFallbackProps {
  className?: string;
  children?: string;
}

const WebflowAvatarFallback: React.FC<WebflowAvatarFallbackProps> = ({
  className,
  children = "AB",
}) => {
  return (
    <div
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full text-sm font-medium",
        className
      )}
    >
      {children}
    </div>
  );
};

// Export for local testing
export { WebflowAvatarFallback };

export default declareComponent(WebflowAvatarFallback, {
  name: "AvatarFallback",
  description: "A ShadCN UI avatar fallback component - place inside Avatar component",
  group: "Display",
  props: {
    className: props.Text({
      name: "Class Name",
      defaultValue: "",
    }),
    children: props.Text({
      name: "Fallback Text",
      defaultValue: "AB",
    }),
  },
});



