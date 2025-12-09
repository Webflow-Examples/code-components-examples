import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import type { Location } from "./types";
import { validateMapKey } from "./mapUtils";
import {
  initializeMap,
  cleanupMap,
  addMarkersToMap,
  fitMapToBounds,
  clearMarkers,
} from "./mapInitializer";

interface UseMapboxParams {
  center: [number, number];
  zoom: number;
  mapKey: string | undefined;
}

interface SetMarkersOptions {
  fitBounds?: boolean;
  fitBoundsPadding?: number;
  fitBoundsMaxZoom?: number;
}

interface UseMapboxReturn {
  mapRef: React.MutableRefObject<mapboxgl.Map | null>;
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
  error: string | null;
  isMapLoaded: boolean;
  setMarkers: (locations: Location[], options?: SetMarkersOptions) => void;
  clearMarkers: () => void;
}

/**
 * Custom hook for initializing and managing Mapbox GL JS map
 */
export const useMapbox = ({
  center,
  zoom,
  mapKey,
}: UseMapboxParams): UseMapboxReturn => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const initializedRef = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  /**
   * Add or update markers on the map
   */
  const setMarkersCallback = useCallback(
    (locations: Location[], options?: SetMarkersOptions) => {
      if (!mapRef.current || !isMapLoaded) {
        console.warn("Map is not ready. Cannot add markers.");
        return;
      }

      // Clear existing markers first
      clearMarkers(markersRef);

      // Add new markers and get bounds
      const bounds = addMarkersToMap(mapRef.current, locations, markersRef);

      // Fit map to bounds if requested
      const shouldFitBounds = options?.fitBounds ?? true;
      const padding = options?.fitBoundsPadding ?? 50;
      const maxZoom = options?.fitBoundsMaxZoom ?? 15;

      fitMapToBounds(
        mapRef.current,
        bounds,
        shouldFitBounds,
        locations.length,
        padding,
        maxZoom
      );
    },
    [isMapLoaded]
  );

  /**
   * Clear all markers from the map
   */
  const clearMarkersCallback = useCallback(() => {
    clearMarkers(markersRef);
  }, []);

  useEffect(() => {
    // Prevent re-initialization
    if (initializedRef.current || !mapContainerRef.current) return;

    // Validate API key
    if (!validateMapKey(mapKey)) {
      setError(
        "Please add a valid Mapbox API key to your .env file. Get one from https://account.mapbox.com/"
      );
      return;
    }

    // Set access token and mark as initialized
    initializedRef.current = true;
    mapboxgl.accessToken = mapKey;

    try {
      // Initialize map
      mapRef.current = initializeMap({
        container: mapContainerRef.current,
        center,
        zoom,
        onError: setError,
        onLoad: () => setIsMapLoaded(true),
      });
    } catch (err) {
      console.error("Error initializing map:", err);
      setError("Failed to initialize map. Please check your API key.");
      initializedRef.current = false;
    }

    // Cleanup only on unmount
    return () => cleanupMap(mapRef, markersRef, initializedRef);
  }, []); // Empty dependency array - only run once!

  return {
    mapRef,
    mapContainerRef,
    error,
    isMapLoaded,
    setMarkers: setMarkersCallback,
    clearMarkers: clearMarkersCallback,
  };
};
