import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import LocationItem from "./LocationItem";
import "./LocationItem.css";
import "./index.css";

export default declareComponent(LocationItem, {
  name: "LocationItem",
  props: {
    name: props.Text({
      name: "Name",
      defaultValue: "Location Name",
    }),
    address: props.Text({
      name: "Address",
      defaultValue: "123 Main St, Anytown, USA",
    }),
    distance: props.Number({
      name: "Distance",
    }),
    locationId: props.Number({
      name: "Location ID",
      required: true,
    }),
  },
});
