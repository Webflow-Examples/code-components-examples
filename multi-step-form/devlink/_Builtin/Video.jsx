"use client";
import React from "react";
import { cj } from "../utils";
const getAspectRatio = ({ width, height }) =>
  height && width ? height / width : 0;
export const Video = React.forwardRef(function Video(
  { className = "", options, ...props },
  ref
) {
  const { height = 0, width = 0, title = "", url = undefined } = options || {};
  const aspectRatio = getAspectRatio({ width, height });
  return React.createElement(
    "div",
    {
      ...props,
      style: { paddingTop: `${aspectRatio * 100}%` },
      className: cj("w-video", "w-embed", className),
      ref: ref,
    },
    React.createElement("iframe", {
      className: "embedly-embed",
      src: url,
      width: width,
      height: height,
      title: title,
      allowFullScreen: true,
      scrolling: "no",
      frameBorder: "0",
    })
  );
});
