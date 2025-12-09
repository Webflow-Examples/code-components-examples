import mapboxgl from "mapbox-gl";
import type { Location } from "./types";
import { createMarkerElement, createLocationPopup } from "./mapUtils";

interface MapInitializerParams {
  container: HTMLDivElement;
  center: [number, number];
  zoom: number;
  onError: (error: string) => void;
  onLoad?: () => void;
}

/**
 * Add markers to map and return bounds
 * Optimized for smooth pan/zoom performance
 */
export const addMarkersToMap = (
  map: mapboxgl.Map,
  locations: Location[],
  markersRef: React.MutableRefObject<mapboxgl.Marker[]>
): mapboxgl.LngLatBounds => {
  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((location) => {
    // Extend bounds to include this location
    bounds.extend(new mapboxgl.LngLat(location.lng, location.lat));

    // Create marker with custom element and popup
    const markerElement = createMarkerElement();
    const popup = createLocationPopup(location);

    // Create marker with optimized settings for better performance
    const marker = new mapboxgl.Marker({
      element: markerElement,
      anchor: "bottom",
      // Optimize rendering
      pitchAlignment: "viewport",
      rotationAlignment: "viewport",
    })
      .setLngLat(new mapboxgl.LngLat(location.lng, location.lat))
      .setPopup(location.popup ? popup : null)
      .addTo(map);

    markersRef.current.push(marker);
  });

  return bounds;
};

/**
 * Fit map to bounds with configured padding
 */
export const fitMapToBounds = (
  map: mapboxgl.Map,
  bounds: mapboxgl.LngLatBounds,
  shouldFitBounds: boolean,
  locationsCount: number,
  padding: number,
  maxZoom: number
): void => {
  if (shouldFitBounds && locationsCount > 0) {
    map.fitBounds(bounds, {
      padding: {
        top: padding,
        bottom: padding,
        left: padding,
        right: padding,
      },
      maxZoom: maxZoom,
      duration: 1000,
    });
  }
};

/**
 * Remove all existing markers from the map
 */
export const clearMarkers = (
  markersRef: React.MutableRefObject<mapboxgl.Marker[]>
): void => {
  markersRef.current.forEach((marker) => marker.remove());
  markersRef.current = [];
};

/**
 * Initialize the map instance
 */
export const initializeMap = ({
  container,
  center,
  zoom,
  onError,
  onLoad,
}: MapInitializerParams): mapboxgl.Map => {
  const map = new mapboxgl.Map({
    container: container,
    style: "mapbox://styles/mapbox/streets-v12",
    center: center,
    zoom: zoom,
    // Performance optimizations
    antialias: true,
    // Smoother animations
    fadeDuration: 300,
    // Better rendering performance
    preserveDrawingBuffer: false,
    refreshExpiredTiles: true,
  });

  // Add navigation controls
  map.addControl(new mapboxgl.NavigationControl(), "top-right");

  // Add error handler
  map.on("error", (e) => {
    console.error("Map error:", e);
    onError(
      "Failed to load map. Please check your API key and network connection."
    );
  });

  // Handle map load
  map.on("load", () => {
    console.log("Map loaded successfully!");
    map.resize();
    onLoad?.();
  });

  return map;
};

/**
 * Cleanup map resources
 */
export const cleanupMap = (
  mapRef: React.MutableRefObject<mapboxgl.Map | null>,
  markersRef: React.MutableRefObject<mapboxgl.Marker[]>,
  initializedRef: React.MutableRefObject<boolean>
): void => {
  console.log("Cleaning up map...");

  // Remove all markers
  clearMarkers(markersRef);

  // Remove map instance
  if (mapRef.current) {
    mapRef.current.remove();
    mapRef.current = null;
  }

  initializedRef.current = false;
};
