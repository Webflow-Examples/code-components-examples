import React from "react";
import StoreLocatorView from "./StoreLocatorView";
import "./styles.css";

interface StoreLocatorProps {
  mapStyle?: string;
  distanceUnit?: string;
  apiBaseUrl?: string;
  authToken?: string;
}

const mapStyleMapping: { [key: string]: string } = {
  Streets: "mapbox/streets-v12",
  Outdoors: "mapbox/outdoors-v12",
  Light: "mapbox/light-v11",
  Dark: "mapbox/dark-v11",
  Satellite: "mapbox/satellite-v9",
  "Satellite Streets": "mapbox/satellite-streets-v12",
};

const distanceUnitMapping: { [key: string]: "mi" | "km" } = {
  Miles: "mi",
  Kilometers: "km",
};

const StoreLocator: React.FC<StoreLocatorProps> = ({
  mapStyle = "Streets",
  distanceUnit = "Miles",
  apiBaseUrl,
  authToken,
}) => {
  // If the auth token is missing, display a clear configuration message.
  // This helps users in the Designer understand what to do next.
  if (!authToken) {
    return (
      <div className="setup-container">
        <h3>Store Locator: Needs Configuration</h3>
        <p>
          Please generate an Auth Token from your setup page (e.g., /map/setup)
          and paste it into the component's settings panel.
        </p>
      </div>
    );
  }

  const fullMapStyle = mapStyleMapping[mapStyle] || "mapbox/streets-v12";
  const selectedDistanceUnit = distanceUnitMapping[distanceUnit] || "mi";

  return (
    <StoreLocatorView
      mapStyle={fullMapStyle}
      distanceUnit={selectedDistanceUnit}
      apiBaseUrl={apiBaseUrl}
      authToken={authToken}
    />
  );
};

export default StoreLocator;
