import * as React from "react";
import * as Types from "./types";

declare function Navbar(props: {
  as?: React.ElementType;
  navbarLinkFeatures?: React.ReactNode;
  navbarLinkProducts?: React.ReactNode;
  navbarLinkResources?: React.ReactNode;
  navbarLinkContact?: React.ReactNode;
  buttonTextGetStarted?: React.ReactNode;
  localeDropdownSlot?: Types.Devlink.Slot;
  runtimeProps?: Types.Devlink.RuntimeProps;
  onClick?: Types.Devlink.RuntimeProps;
  temperature?: number;
  weatherIcon?: Types.Devlink.Slot;
}): React.JSX.Element;
