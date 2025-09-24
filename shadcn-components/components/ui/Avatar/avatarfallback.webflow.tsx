import React from "react";
import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { cn } from "@/lib/utils";

import "../../../app/globals.css";

interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
  children?: React.ReactNode;
}

const AvatarFallback: React.FC<AvatarFallbackProps> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    style={{
      fontSize: "2em",
    }}
    {...props}
  >
    {children}
  </div>
);

export { AvatarFallback };

interface WebflowAvatarFallbackProps {
  className?: string;
  children?: React.ReactNode;
}

const WebflowAvatarFallback: React.FC<WebflowAvatarFallbackProps> = ({
  className,
  children,
}) => {
  return <AvatarFallback className={className}>{children}</AvatarFallback>;
};

export default declareComponent(WebflowAvatarFallback, {
  name: "AvatarFallback",
  description:
    "A ShadCN UI avatar fallback component - place inside Avatar component",
  group: "Display",
  props: {
    className: props.Text({
      name: "Class Name",
      defaultValue: "",
      tooltip: "Optional: Add Additional Tailwind CSS classes",
    }),
    children: props.Text({
      name: "Fallback Text",
      defaultValue: "AB",
      tooltip:
        "Optional: Add Fallback Text if there is no image for the Avatar",
    }),
  },
  options: {
    ssr: true,
  },
});
