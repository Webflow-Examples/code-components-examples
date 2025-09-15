import React from "react";
import StoreLocatorView from "./StoreLocatorView";

interface StoreLocatorProps {
  distanceUnit?: "Miles" | "Kilometers";
  mapStyle?:
    | "Streets"
    | "Outdoors"
    | "Light"
    | "Dark"
    | "Satellite"
    | "Satellite Streets";
  apiBaseUrl?: string;
  authToken?: string;
}

const mapStyleMapping = {
  Streets: "streets-v12",
  Outdoors: "outdoors-v12",
  Light: "light-v11",
  Dark: "dark-v11",
  Satellite: "satellite-v9",
  "Satellite Streets": "satellite-streets-v12",
};

const StoreLocator: React.FC<StoreLocatorProps> = ({
  distanceUnit,
  mapStyle,
  apiBaseUrl,
  authToken,
}) => {
  const selectedMapStyle = mapStyle ? mapStyleMapping[mapStyle] : "streets-v12";

  return (
    <StoreLocatorView
      distanceUnit={distanceUnit === "Miles" ? "mi" : "km"}
      mapStyle={selectedMapStyle}
      apiBaseUrl={apiBaseUrl}
      authToken={authToken}
    />
  );
};

export default StoreLocator;
