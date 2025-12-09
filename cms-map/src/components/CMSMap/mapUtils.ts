import mapboxgl from "mapbox-gl";
import type { Location } from "./types";

/**
 * Create a custom marker HTML element (optimized for performance)
 */
export const createMarkerElement = (): HTMLDivElement => {
  const el = document.createElement("div");
  el.className = "custom-marker";
  el.style.width = "30px";
  el.style.height = "30px";
  el.style.backgroundImage =
    "url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)";
  el.style.backgroundSize = "cover";
  el.style.cursor = "pointer";
  // Performance optimization: use GPU acceleration
  el.style.transform = "translate3d(0, 0, 0)";
  el.style.willChange = "transform";
  return el;
};

/**
 * Create a popup for a location
 */
export const createLocationPopup = (location: Location): mapboxgl.Popup => {
  const popup = new mapboxgl.Popup({
    offset: 25,
    closeButton: true,
    closeOnClick: true,
    maxWidth: "300px",
  }).setHTML(
    `<div class="marker-popup-content" style="max-width: 300px; overflow-y: auto; padding: 40px 20px;"></div>`
  );
  if (location.popup) {
    console.log(popup._content);
    const element =
      popup.getElement() ||
      popup._content?.querySelector(".marker-popup-content");

    element?.appendChild(location.popup);
  }

  return popup;
};

/**
 * Validate Mapbox API key
 */
export const validateMapKey = (mapKey: string | undefined): boolean => {
  if (
    !mapKey ||
    mapKey.includes("example") ||
    mapKey === "your_mapbox_api_key_here"
  ) {
    return false;
  }
  return true;
};
