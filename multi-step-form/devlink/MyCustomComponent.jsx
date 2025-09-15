"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./MyCustomComponent.module.css";

export function MyCustomComponent({ as: _Component = _Builtin.Section }) {
  return (
    <_Component
      className={_utils.cx(_styles, "section", "hero")}
      grid={{
        type: "section",
      }}
      tag="section"
      bind="849cdcb4-a4f6-1d3d-cf95-3c4a2a116ad9"
    >
      <_Builtin.Block className={_utils.cx(_styles, "container")} tag="div">
        <_Builtin.Grid
          className={_utils.cx(_styles, "cta-header-component")}
          tag="div"
          hello="world"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "hero-header-component")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "hero-text-wrapper")}
              tag="div"
            >
              <_Builtin.Heading
                className={_utils.cx(_styles, "hero-heading")}
                tag="h1"
              >
                {"The bank of the future. "}
                <_Builtin.Span
                  className={_utils.cx(_styles, "text-color-gray500")}
                >
                  {"Embrace a new era of financial management."}
                </_Builtin.Span>
              </_Builtin.Heading>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "button-row")}
              tag="div"
            >
              <_Builtin.Link
                className={_utils.cx(_styles, "button")}
                button={false}
                block="inline"
                options={{
                  href: "#",
                }}
              >
                <_Builtin.Block tag="div">{"Get started"}</_Builtin.Block>
              </_Builtin.Link>
              <_Builtin.Link
                className={_utils.cx(_styles, "button-tertiary", "hide-tablet")}
                button={false}
                block="inline"
                options={{
                  href: "#",
                }}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-block-2")}
                  tag="div"
                >
                  {"Learn more"}
                </_Builtin.Block>
              </_Builtin.Link>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "header-image-wrapper")}
            id={_utils.cx(
              _styles,
              "w-node-_849cdcb4-a4f6-1d3d-cf95-3c4a2a116ae9-2a116ad9"
            )}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "image")}
              loading="lazy"
              width="auto"
              height="auto"
              alt="Hero image showcasing an intuitive bank account management interface with credit card details."
              src="https://cdn.prod.website-files.com/6813a82d2006ad93ffe5da10/6813a82d2006ad93ffe5da88_EN%20-%20Hero%20Image.webp"
            />
          </_Builtin.Block>
        </_Builtin.Grid>
      </_Builtin.Block>
    </_Component>
  );
}
