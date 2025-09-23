import { Button } from "./button";
import { props } from '@webflow/data-types';
import { declareComponent } from "@webflow/react";

import "../../app/globals.css";

export default declareComponent(Button, {
  name: "Button",
  description: "A ShadCN UI button component",
  group: "Interaction",
  props: {
    className: props.Text({
      name: "className",
      defaultValue: "",
    }),
    variant: props.Variant({
      name: "Variant",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      defaultValue: "default",
    }),
    size: props.Variant({
      name: "Size",
      options: ["default", "sm", "lg", "icon"],
      defaultValue: "default",
    }),
    children: props.Text({
      name: "Text",
      defaultValue: "Button",
    }),
    asChild: props.Visibility({
      name: "As Child",
      defaultValue: false,
    }),
    disabled: props.Visibility({
      name: "Disabled",
      defaultValue: false,
    }),
  },
});
