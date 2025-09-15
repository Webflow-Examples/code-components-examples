"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./NeoBrutalistNavbar.module.css";

export function NeoBrutalistNavbar({ as: _Component = _Builtin.Section }) {
  return (
    <_Component
      className={_utils.cx(_styles, "nb-navbar")}
      grid={{
        type: "section",
      }}
      tag="section"
      bind="1e048d04-7693-bcd2-67f7-3622fbe3fa42"
    >
      <_Builtin.Block tag="div">{"AstralFund"}</_Builtin.Block>
      <_Builtin.Link
        className={_utils.cx(_styles, "nb-link")}
        button={false}
        block=""
        options={{
          href: "#",
        }}
      >
        {"Home"}
      </_Builtin.Link>
      <_Builtin.Link
        className={_utils.cx(_styles, "nb-link")}
        button={false}
        block=""
        options={{
          href: "#",
        }}
      >
        {"Docs"}
      </_Builtin.Link>
      <_Builtin.Link
        className={_utils.cx(_styles, "nb-link")}
        button={false}
        block=""
        options={{
          href: "#",
        }}
      >
        {"Blog"}
      </_Builtin.Link>
      <_Builtin.Link
        className={_utils.cx(_styles, "nb-link")}
        button={false}
        block=""
        options={{
          href: "#",
        }}
      >
        {"Contact"}
      </_Builtin.Link>
      <_Builtin.Link
        className={_utils.cx(_styles, "nb-button")}
        button={true}
        bind="1e048d04-7693-bcd2-67f7-3622fbe3fa4d"
        block=""
        options={{
          href: "#",
        }}
      >
        {"Start Building"}
      </_Builtin.Link>
    </_Component>
  );
}
