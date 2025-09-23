"use client";

import React from "react";
import { props } from '@webflow/data-types';
import { declareComponent } from "@webflow/react";
import { cn } from "@/lib/utils";

import "../../app/globals.css";

interface WebflowAvatarImageProps {
  className?: string;
  src?: string;
  alt?: string;
}

const WebflowAvatarImage: React.FC<WebflowAvatarImageProps> = ({
  className,
  src,
  alt = "Avatar",
}) => {
  const [imageError, setImageError] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  // Only render image if src is provided and no error occurred
  if (!src || imageError) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn("aspect-square size-full object-cover", className)}
      onError={handleImageError}
      onLoad={handleImageLoad}
      style={{
        opacity: imageLoaded ? 1 : 0,
        transition: 'opacity 0.2s ease-in-out'
      }}
    />
  );
};

// Export for local testing
export { WebflowAvatarImage };

export default declareComponent(WebflowAvatarImage, {
  name: "AvatarImage",
  description: "A ShadCN UI avatar image component - place inside Avatar component",
  group: "Display",
  props: {
    className: props.Text({
      name: "Class Name",
      defaultValue: "",
    }),
    src: props.Text({
      name: "Image URL",
      defaultValue: "",
    }),
    alt: props.Text({
      name: "Alt Text",
      defaultValue: "Avatar",
    }),
  },
});
