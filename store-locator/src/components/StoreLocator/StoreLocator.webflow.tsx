import { declareComponent } from "@webflow/react";
import StoreLocator from "./StoreLocator.tsx";
import { props } from "@webflow/data-types";

const component = declareComponent(StoreLocator, {
  name: "Store Locator",
  props: {
    mapStyle: props.Variant({
      name: "Map Style",
      options: [
        "Streets",
        "Outdoors",
        "Light",
        "Dark",
        "Satellite",
        "Satellite Streets",
      ],
      defaultValue: "Streets",
    }),
    distanceUnit: props.Variant({
      name: "Distance Unit",
      options: ["Miles", "Kilometers"],
      defaultValue: "Miles",
    }),
    apiBaseUrl: props.Text({
      name: "API Base URL",
      defaultValue: "https://your-production-domain.com/map",
    }),
    authToken: props.Text({
      name: "Auth Token (JWT)",
    }),
  },
});

export default component;
