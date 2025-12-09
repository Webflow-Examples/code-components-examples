import CMSMap from "./CMSMap";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(CMSMap, {
  name: "CMS Map",
  description: "A CMS map component",
  options: {
    ssr: false,
  },
  props: {
    mapKey: props.Text({
      name: "Map Key",
      defaultValue: "",
    }),
    centerLat: props.Number({
      name: "Center Latitude",
      defaultValue: 0,
    }),
    centerLng: props.Number({
      name: "Center Longitude",
      defaultValue: 0,
    }),
    zoom: props.Number({
      name: "Zoom",
      defaultValue: 10,
    }),
    fitBounds: props.Boolean({
      name: "Fit Bounds",
      defaultValue: true,
    }),
    fitBoundsPadding: props.Number({
      name: "Fit Bounds Padding",
      defaultValue: 10,
    }),
    fitBoundsMaxZoom: props.Number({
      name: "Fit Bounds Max Zoom",
      defaultValue: 15,
    }),
    controlsVerticalPadding: props.Number({
      name: "Controls Top Padding",
      defaultValue: 20,
    }),
    controlsHorizontalPadding: props.Number({
      name: "Controls Right Padding",
      defaultValue: 20,
    }),
    MarkersCollection: props.Slot({
      name: "Markers Collection",
      group: "Content",
      tooltip: "The slot for the markers collection",
    }),
    ShowMarkersCollection: props.Boolean({
      name: "Show Markers Collection",
      group: "Visibility",
      tooltip: "Whether to show the markers collection",
      defaultValue: true,
    }),
  },
});
