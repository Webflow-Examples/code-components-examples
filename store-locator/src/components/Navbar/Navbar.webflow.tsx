import { declareComponent } from "@webflow/react";
import Navbar from "./Navbar";
import "../StoreLocator/styles.css";
import { props } from "@webflow/data-types";

const component = declareComponent(Navbar, {
  name: "Navbar",
  props: {
    apiBaseUrl: props.Text({
      name: "API Base URL",
      defaultValue: "https://your-production-domain.com/base_path",
    }),
    title: props.Text({
      name: "Title",
      defaultValue: "Store Locator",
    }),
  },
});

export default component;
