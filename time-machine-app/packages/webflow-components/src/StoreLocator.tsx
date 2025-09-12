import { useState, useRef, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { useWebflowContext } from "@webflow/react";
import Map from "react-map-gl";
import { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./StoreLocator.css";
import { getDistanceFromLatLonInKm } from "./utils/distance";
import CustomMarker from "./CustomMarker";
import { selectedLocationId } from "./store";
import SetupAuth from "./components/SetupAuth";
import SetupApiKey from "./components/SetupApiKey";
import SetupCollection from "./components/SetupCollection";
import LocationItem from "./LocationItem";
import type { Location } from "./types";
import {
  fetchCollections,
  fetchLocations,
  fetchMapConfig,
  geocodeAddress,
  saveMapboxKey,
} from "./api";

type StoreLocatorProps = {
  forceLiveMode?: boolean;
  siteId?: string;
  collectionId?: string;
  onSetupComplete?: () => void;
  backendUrl?: string;
};

export default function StoreLocator({
  forceLiveMode,
  siteId,
  collectionId,
  onSetupComplete,
  backendUrl = "http://localhost:4321", // Default for local dev
}: StoreLocatorProps) {
  const webflowContext = useWebflowContext();
  const isDesigner = webflowContext && !webflowContext.interactive;
  const isLocalhost = !webflowContext;
  const isDevelopment = process.env.NODE_ENV === "development";
  const showSetupUI = isDevelopment && !forceLiveMode;

  if (!isDevelopment && backendUrl.includes("localhost")) {
    return (
      <div
        style={{
          padding: "20px",
          border: "2px solid red",
          backgroundColor: "#ffeeee",
          textAlign: "center",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Store Locator Configuration Error</h3>
        <p>
          The <strong>Backend URL</strong> is pointing to a localhost address.
          This will not work on your live Webflow site.
        </p>
        <p>
          Please deploy your Astro backend and update the Backend URL prop in
          the Webflow Designer.
        </p>
      </div>
    );
  }

  type SetupState = "NEEDS_AUTH" | "NEEDS_CONFIG" | "READY";
  const [setupState, setSetupState] = useState<SetupState>("NEEDS_AUTH");
  const [collections, setCollections] = useState<any[]>([]);
  const [setupSiteId, setSetupSiteId] = useState<string | undefined>(
    () => siteId || localStorage.getItem("storeLocator:siteId") || undefined
  );
  const [mapboxKey, setMapboxKey] = useState<string | null>(null);
  const [isKeySet, setIsKeySet] = useState(false);

  const [viewState, setViewState] = useState({
    longitude: -122.4,
    latitude: 37.78,
    zoom: 11,
  });
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [allLocations, setAllLocations] = useState<Location[]>([]);
  const [sortedLocations, setSortedLocations] = useState<Location[]>([]);
  const mapRef = useRef<any>(null);

  const handleAuthClick = () => {
    const authUrl = `${backendUrl}/api/auth/webflow?origin=${window.location.origin}`;
    window.open(authUrl, "webflow-auth", "width=600,height=700");
  };

  const handleSaveKey = async (key: string) => {
    if (!setupSiteId) return;
    await saveMapboxKey(backendUrl, setupSiteId, key);
    // On success, we can assume the key is saved and move to the next step.
    setSetupState("NEEDS_CONFIG");
  };

  const handleResetAuth = () => {
    localStorage.removeItem("storeLocator:siteId");
    setSetupSiteId(undefined);
    setSetupState("NEEDS_AUTH");
    setIsKeySet(false);
    setCollections([]);
  };

  useEffect(() => {
    const handleAuthMessage = (event: MessageEvent) => {
      if (event.origin.startsWith("http://localhost")) {
        // Looser check for local dev
        if (event.data && event.data.type === "webflow_auth_success") {
          const siteId = event.data.siteId;
          localStorage.setItem("storeLocator:siteId", siteId);
          setSetupSiteId(siteId);
          setSetupState("NEEDS_CONFIG");
        }
      }
    };
    window.addEventListener("message", handleAuthMessage);
    return () => window.removeEventListener("message", handleAuthMessage);
  }, []);

  useEffect(() => {
    if (setupSiteId && collectionId) {
      setSetupState("READY");
    } else if (setupSiteId) {
      setSetupState("NEEDS_CONFIG");
    } else {
      setSetupState("NEEDS_AUTH");
    }
  }, [setupSiteId, collectionId]);

  useEffect(() => {
    if (showSetupUI && setupState === "NEEDS_CONFIG" && setupSiteId) {
      // Fetch collections for the dropdown
      fetchCollections(backendUrl, setupSiteId)
        .then(setCollections)
        .catch((err) =>
          console.error("Failed to fetch collections:", err.message)
        );

      // Check if a map key is already set
      fetchMapConfig(backendUrl, setupSiteId)
        .then((data) => {
          if (data && data.mapboxKey) {
            setIsKeySet(true);
          }
        })
        .catch(() => console.log("No map config found yet."));
    }
  }, [showSetupUI, setupState, setupSiteId, backendUrl]);

  // Fetch locations and map config for the live map
  useEffect(() => {
    if (!showSetupUI && siteId && collectionId) {
      fetchLocations(backendUrl, collectionId, siteId)
        .then((locations) => {
          setAllLocations(locations);
          setSortedLocations(locations);
        })
        .catch((err) =>
          console.error("Failed to fetch locations:", err.message)
        );

      fetchMapConfig(backendUrl, siteId)
        .then((data) => setMapboxKey(data.mapboxKey))
        .catch((err) =>
          console.error("Failed to fetch map config:", err.message)
        );
    }
  }, [showSetupUI, collectionId, siteId, backendUrl]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) {
      setSortedLocations(allLocations);
      return;
    }

    try {
      const data = await geocodeAddress(backendUrl, searchQuery, siteId);
      if (data.features.length > 0) {
        const [lng, lat] = data.features[0].center;

        if (mapRef.current) {
          mapRef.current.flyTo({ center: [lng, lat], zoom: 11 });
        }

        const locationsWithDistance = allLocations.map((location) => ({
          ...location,
          distance: getDistanceFromLatLonInKm(
            lat,
            lng,
            location.lat,
            location.lng
          ),
        }));

        locationsWithDistance.sort((a, b) => a.distance - b.distance);
        setSortedLocations(locationsWithDistance);
      } else {
        alert("Address not found. Please try again.");
      }
    } catch (err) {
      console.error("Geocoding failed:", err);
      alert("There was an error searching for that address.");
    }
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [location.lng, location.lat], zoom: 14 });
    }
  };

  const $selectedLocationId = useStore(selectedLocationId);

  useEffect(() => {
    if ($selectedLocationId !== null) {
      const location = sortedLocations.find(
        (l) => l.id === $selectedLocationId
      );
      if (location) {
        handleLocationSelect(location);
      }
    }
  }, [$selectedLocationId, sortedLocations]);

  if (showSetupUI) {
    // Designer-facing setup UI
    return (
      <div className="setup-container" style={{ padding: "20px" }}>
        <h2>Store Locator Setup</h2>
        {setupState === "NEEDS_AUTH" && (
          <SetupAuth onAuthClick={handleAuthClick} />
        )}

        {setupState !== "NEEDS_AUTH" && (
          <button
            onClick={handleResetAuth}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "none",
              border: "1px solid #ccc",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            Reset & Switch Site
          </button>
        )}

        {setupState === "NEEDS_CONFIG" && (
          <>
            <SetupApiKey
              siteId={setupSiteId}
              backendUrl={backendUrl}
              onSaveKey={handleSaveKey}
              isKeySet={isKeySet}
              setIsKeySet={setIsKeySet}
            />
            <SetupCollection
              collections={collections}
              siteId={setupSiteId}
              onSetupComplete={() => setSetupState("READY")}
            />
          </>
        )}

        {setupState === "READY" && (
          <div>
            <p
              style={{
                marginTop: "16px",
                fontWeight: "bold",
                color: "green",
              }}
            >
              ✅ Setup Complete!
            </p>
            <button
              onClick={onSetupComplete}
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                cursor: "pointer",
              }}
            >
              View Map
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="store-locator-container">
      <div className="sidebar">
        <h2>Search for a Studio</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter an address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <div className="location-list">
          {sortedLocations.map((location) => (
            <LocationItem
              key={location.id}
              name={location.name}
              address={location.address}
              distance={location.distance}
              locationId={location.id}
            />
          ))}
        </div>
      </div>
      <div className="map-container">
        {mapboxKey ? (
          <Map
            ref={mapRef}
            {...viewState}
            onMove={(evt: any) => setViewState(evt.viewState)}
            mapboxAccessToken={mapboxKey}
            mapStyle="mapbox://styles/mapbox/light-v11"
          >
            {sortedLocations.map((location) => (
              <Marker
                key={location.id}
                longitude={location.lng}
                latitude={location.lat}
                onClick={(e: any) => {
                  e.originalEvent.stopPropagation();
                  handleLocationSelect(location);
                }}
              >
                <CustomMarker selected={selectedLocation?.id === location.id} />
              </Marker>
            ))}

            {selectedLocation && (
              <Popup
                longitude={selectedLocation.lng}
                latitude={selectedLocation.lat}
                onClose={() => setSelectedLocation(null)}
                anchor="top"
              >
                <div>
                  <h3>
                    <a href={`#location-${selectedLocation.id}`}>
                      {selectedLocation.name}
                    </a>
                  </h3>
                  <p>{selectedLocation.address}</p>
                  <p>{selectedLocation.phone}</p>
                </div>
              </Popup>
            )}
          </Map>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            Loading Map...
          </div>
        )}
      </div>
    </div>
  );
}
