import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import StoreLocator from "./StoreLocator";
import "./index.css";
import "./StoreLocator.css";

const WebflowStoreLocator = declareComponent(StoreLocator, {
  name: "StoreLocator",
  props: {
    forceLiveMode: props.Boolean({
      name: "Force Live Mode",
      defaultValue: false,
    }),
    siteId: props.Text({
      name: "Site ID",
      defaultValue: "",
    }),
    collectionId: props.Text({
      name: "Collection ID",
      defaultValue: "",
    }),
    backendUrl: props.Text({
      name: "Backend URL",
      defaultValue: "http://localhost:4321",
    }),
  },
});

export default WebflowStoreLocator;
