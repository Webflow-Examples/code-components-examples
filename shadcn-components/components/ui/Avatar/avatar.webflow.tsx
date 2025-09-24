import React from "react";
import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarProps } from "./avatar"; // Import AvatarProps

import "../../../app/globals.css";

interface WebflowAvatarProps {
  className?: string;
  children?: React.ReactNode;
  size?: AvatarProps["size"]; // Re-adding size prop
}

const WebflowAvatar: React.FC<WebflowAvatarProps> = ({
  className,
  children,
  size, // Re-adding size prop
}) => {
  return (
    <Avatar className={cn(className)} size={size} data-avatar-root>
      {children}
    </Avatar>
  );
};

// Export for local testing
export { WebflowAvatar };

export default declareComponent(WebflowAvatar, {
  name: "Avatar",
  description:
    "A ShadCN UI avatar component - use with AvatarImage and AvatarFallback",
  group: "Display",
  props: {
    className: props.Text({
      name: "Class Name",
      defaultValue: "",
      tooltip: "Optional: Add Additional Tailwind CSS classes",
    }),
    children: props.Slot({
      name: "Content",
      tooltip: "Add the Avatar Image Component here as a slot",
    }),
    size: props.Variant({
      name: "Size",
      options: ["default", "sm", "lg", "xl"],
      defaultValue: "default",
      tooltip: "Controls the size of the avatar.",
    }),
  },
  options: {
    ssr: false, // Force Client-Side Rendering
  },
});
