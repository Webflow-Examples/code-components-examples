import React from "react";
import { props, PropType, PropValues } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";
import { cn } from "@/lib/utils";

import "../../../app/globals.css";

// This file defines the Webflow Code Component wrapper for the ShadCN AvatarImage React component.

// Webflow has its own proprietary prop system (`@webflow/data-types`) which differs from standard React props.
// Our base `AvatarImage` React component expects standard `src` and `alt` string props.
// Webflow, however, provides an `Image` prop type (`PropType.Image`) which returns a structured object `{ src: string, alt?: string }`.
// To bridge this difference, we need a wrapper component that translates Webflow's prop structure into the format our React component expects.

// PROP MAPPING:
// 1. Define the expected props for the base ShadCN AvatarImage React component.
// 2. Define `WebflowAvatarImageProps` to accept Webflow-specific prop types, such as `PropValues[PropType.Image]`.
// 3. Use `Omit<AvatarImageProps, "src" | "alt">` to ensure that our wrapper component doesn't expect `src` and `alt` directly, as they will come from the `image` prop.
// 4. Inside the `WebflowAvatarImage` component, we safely extract `src` and `alt` from the `image` prop provided by Webflow.
// 5. These extracted `src` and `alt` values, along with any other standard props (like `className`), are then passed down to the original `AvatarImage` React component.

// ** SHADCN AVATAR IMAGE COMPONENT **

type AvatarImageProps = {
  className?: string;
  src?: string;
  alt?: string;
};

const AvatarImage: React.FC<AvatarImageProps> = ({
  className,
  src,
  alt = "Avatar",
}) => {
  if (!src) {
    return (
      <div
        style={{
          backgroundColor: "lightgray",
          color: "black",
          fontSize: "1.5em",
          width: "48px", // Explicit inline width
          height: "48px", // Explicit inline height
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%", // Ensure it's round
        }}
        className={cn("rounded-full", className)}
      >
        {alt ? alt.charAt(0).toUpperCase() : "?"}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={{
        width: "48px", // Explicit inline width
        height: "48px", // Explicit inline height
        objectFit: "cover", // Ensure image covers the area
      }}
      className={cn("aspect-square size-full object-cover", className)}
    />
  );
};

export { AvatarImage };

//  ** WEBFLOW WRAPPER COMPONENT **

type WebflowAvatarImageProps = {
  className?: string;
  image: PropValues[PropType.Image];
} & Omit<AvatarImageProps, "src" | "alt">;

export const WebflowAvatarImage: React.FC<WebflowAvatarImageProps> = ({
  className,
  image,
  ...props
}) => {
  return (
    <AvatarImage
      className={className}
      src={image.src}
      alt={image.alt}
      {...props}
    />
  );
};

export default declareComponent(WebflowAvatarImage, {
  name: "AvatarImage",
  description:
    "A ShadCN UI avatar image component - place inside Avatar component",
  group: "Display",
  props: {
    className: props.Text({
      name: "Class Name",
      defaultValue: "",
    }),
    image: props.Image({
      name: "Image",
      tooltip: "The image to display in the avatar",
    }),
  },
  options: {
    ssr: false, // Force Client-Side Rendering
  },
});
