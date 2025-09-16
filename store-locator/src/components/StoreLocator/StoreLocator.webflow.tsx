import { declareComponent } from "@webflow/react";
import StoreLocator from "./StoreLocator.tsx";
import { props } from "@webflow/data-types";
import "../StoreLocator/styles.css";

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
      defaultValue: "https://hello-webflow-cloud.webflow.io/map",
    }),
    authToken: props.Text({
      name: "Auth Token (JWT)",
      defaultValue:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaXRlSWQiOiI2OGI3MDJiMjA3N2E2MzdlNTc4MzdlMzYiLCJjb2xsZWN0aW9uSWQiOiI2OGM0NjY4ZTMxMTkzYjJkZmM4MTczZTEiLCJtYXBib3hUb2tlbiI6InBrLmV5SjFJam9pYW1WbGJubDFjMnBoYm1VaUxDSmhJam9pWTIxbWFEVnBOVzUzTURkeGRUSnNjSGxuZFRsamRXZDZZeUo5LkZsSnRjaTdZSG1pNXktNXBXeGFNUGciLCJpYXQiOjE3NTgwNDQ1NjgsImV4cCI6MTc4OTYwMjE2OH0.Wa9j__Fl0zR72Zhol0QUfWbCevgz22hirRfNGUgdZWk",
    }),
  },
});

export default component;
