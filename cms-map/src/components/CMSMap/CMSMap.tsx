import { useEffect, useMemo, useRef } from "react";
import { useWebflowContext } from "@webflow/react";
import type { CMSMapProps } from "./types";
import { useMapbox } from "./useMapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import "./CMSMap.css";
import { useCMSCollectionItems } from "./useCMSCollectionItems";
import { useShadowGlobalStyles } from "../../hooks/useShadowGlobalStyles";

const getMarkers = (items: HTMLDivElement[]) => {
  return items
    .map((item) => {
      const element = item.querySelector(".marker-pin");
      if (!element) return null;
      const lat = element.getAttribute("data-lat");
      const lng = element.getAttribute("data-lng");
      if (!lat || !lng) return null;
      const popup = element.querySelector(".maker-pop-up");

      return {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        popup: popup ? (popup.cloneNode(true) as HTMLDivElement) : null,
      };
    })
    .filter((marker) => marker !== null)
    .map((marker, index) => {
      return {
        id: index,
        ...marker,
      };
    });
};

const CMSMap = ({
  centerLat = -90.5795,
  centerLng = 39.8283,
  zoom = 3,
  fitBounds = true, // Auto-fit by default
  fitBoundsPadding = 50,
  fitBoundsMaxZoom = 15,
  mapKey,
  controlsVerticalPadding = 20,
  controlsHorizontalPadding = 20,
  MarkersCollection,
  ShowMarkersCollection = false,
}: CMSMapProps) => {
  // Reference to parent div for shadow DOM style injection
  const parentRef = useRef<HTMLDivElement>(null);
  // Extract CMS collection items from Webflow slot
  const { cmsCollectionComponentSlotRef, items } =
    useCMSCollectionItems("MarkersCollection");

  const markers = useMemo(() => getMarkers(items), [items]);

  // Inject global styles into shadow DOM
  useShadowGlobalStyles(parentRef);

  const { mode } = useWebflowContext();
  const showMarkersCollection = useMemo(() => {
    if (window.location.host.includes("localhost")) {
      return ShowMarkersCollection;
    }
    if (mode === "publish" || mode === "preview") {
      return false;
    }
    return ShowMarkersCollection;
  }, [mode, ShowMarkersCollection]);
  const center: [number, number] = [centerLat, centerLng];
  const { mapContainerRef, error, isMapLoaded, setMarkers } = useMapbox({
    center,
    zoom,
    mapKey,
  });

  // Dynamic CSS variables for control positioning
  const containerStyle = {
    flex: 1,
    display: "flex" as const,
    flexDirection: "column" as const,
    position: "relative" as const,
    width: "100%",
    height: "100%",
    // CSS variables for control positioning
    ["--controls-vertical-padding" as string]: `${controlsVerticalPadding}px`,
    ["--controls-horizontal-padding" as string]: `${controlsHorizontalPadding}px`,
  };

  // Set markers when map is loaded or when locations change
  useEffect(() => {
    if (isMapLoaded && markers.length > 0) {
      setMarkers(markers, {
        fitBounds,
        fitBoundsPadding,
        fitBoundsMaxZoom,
      });
    }
  }, [
    isMapLoaded,
    markers,
    fitBounds,
    fitBoundsPadding,
    fitBoundsMaxZoom,
    setMarkers,
  ]);

  return (
    <div ref={parentRef} style={containerStyle}>
      {error ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "8px",
            margin: "20px",
          }}
        >
          <div style={{ textAlign: "center", color: "#856404" }}>
            <h3 style={{ margin: "0 0 10px 0" }}>
              ⚠️ Map Configuration Required
            </h3>
            <p style={{ margin: "0 0 10px 0" }}>{error}</p>
            <p style={{ margin: 0, fontSize: "14px" }}>
              Edit the <code>.env</code> file in the project root and replace{" "}
              <code>VITE_MAP_KEY</code> with your actual Mapbox API key.
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div
        id="map-container"
        ref={mapContainerRef}
        style={{
          ...(error ? { opacity: 0 } : {}),
          flex: 1,
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      />
      <div
        style={{
          ...(showMarkersCollection
            ? { display: "block" }
            : { display: "none" }),
          position: "absolute",
          top: controlsVerticalPadding,
          left: controlsHorizontalPadding,
          width: `calc(100% - ${controlsHorizontalPadding * 4}px)`,
          height: `calc(100% - ${controlsVerticalPadding * 2}px)`,
          overflow: "auto",
          padding: "20px 20px",
          backdropFilter: "blur(10px)",
          zIndex: 1000,
          borderRadius: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        }}
        ref={cmsCollectionComponentSlotRef}
      >
        {MarkersCollection}
      </div>
    </div>
  );
};

export default CMSMap;
