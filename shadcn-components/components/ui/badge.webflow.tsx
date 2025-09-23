import { Badge } from "./badge";
import { props } from '@webflow/data-types';
import { declareComponent } from "@webflow/react";

import "../../app/globals.css";

export default declareComponent(Badge, {
  name: "Badge",
  description: "A ShadCN UI badge component",
  group: "Display",
  props: {
    className: props.Text({
      name: "Class Name",
      defaultValue: "",
    }),
    variant: props.Variant({
      name: "Variant",
      options: ["default", "secondary", "destructive", "outline"],
      defaultValue: "default",
    }),
    children: props.Text({
      name: "Text",
      defaultValue: "Badge",
    }),
    asChild: props.Visibility({
      name: "As Child",
      defaultValue: false,
    }),
  },
});
