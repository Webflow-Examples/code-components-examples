"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function DynamicFormGenerator({
  as: _Component = _Builtin.NotSupported,
}) {
  const _styleVariantMap = {
    false: "w-variant-false",
    true: "w-variant-true",
  };

  const _activeStyleVariant = _styleVariantMap[devMode];
  return <_Component _atom="CodeIsland" />;
}
