"use client";

import React from "react";
import { props } from '@webflow/data-types';
import { declareComponent } from "@webflow/react";
import { cn } from "@/lib/utils";

import "../../app/globals.css";

interface WebflowAvatarProps {
  className?: string;
  children?: React.ReactNode;
}

const WebflowAvatar: React.FC<WebflowAvatarProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      data-avatar-root
    >
      {children}
    </div>
  );
};

// Export for local testing
export { WebflowAvatar };

export default declareComponent(WebflowAvatar, {
  name: "Avatar",
  description: "A ShadCN UI avatar component - use with AvatarImage and AvatarFallback",
  group: "Display",
  props: {
    className: props.Text({
      name: "Class Name",
      defaultValue: "",
    }),
    children: props.Slot({
      name: "Content",
    }),
  },
});



