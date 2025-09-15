import React, { useEffect, useRef, useState } from "react";
import type * as LType from "leaflet"; // Import only types
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import { getDistanceKm, kilometersToMiles } from "../../lib/geo";

interface Store {
  id: string;
  fieldData: {
    name: string;
    address: string;
    latitude?: number | null; // Allow null to represent un-geocoded state
    longitude?: number | null; // Allow null to represent un-geocoded state
    phone?: string;
  };
  distance?: number; // Optional, will be added after sorting
}

interface GeocodedLocation {
  id: string;
  latitude: number;
  longitude: number;
}

interface GeocodeApiResponse {
  features: Array<{
    center: [number, number];
    place_name?: string;
  }>;
}

interface StoreWithDistance extends Store {
  distance: number;
}

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

// Note: We don't decode the JWT client-side; the server validates it.

const StoreLocator: React.FC<StoreLocatorProps> = ({
  distanceUnit: rawDistanceUnit,
  mapStyle: rawMapStyle,
  apiBaseUrl,
  authToken,
}) => {
  const distanceUnit = rawDistanceUnit === "Kilometers" ? "km" : "mi";
  const mapStyle = rawMapStyle ? mapStyleMapping[rawMapStyle] : "streets-v12";
  const mapRef = useRef<LType.Map | null>(null);
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);
  const [allStores, setAllStores] = useState<Store[]>([]);
  const [displayedStores, setDisplayedStores] = useState<StoreWithDistance[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [L, setL] = useState<typeof LType | null>(null); // State for Leaflet module
  const [orangeIcon, setOrangeIcon] = useState<LType.DivIcon | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);

  const requestGeoPermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: "geolocation" });
      return result.state; // 'granted', 'prompt', or 'denied'
    } catch (error) {
      console.error("Error querying geolocation permission:", error);
      return "prompt"; // Assume prompt if the query fails
    }
  };

  // Dynamically import Leaflet only on the client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((leafletModule) => {
        setL(leafletModule);

        // Fix for default icon path in bundled environments (client-side only)
        const DefaultIcon = leafletModule.icon({
          iconUrl: icon.src,
          iconRetinaUrl: iconRetina.src,
          shadowUrl: iconShadow.src,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowSize: [41, 41],
        });

        leafletModule.Marker.prototype.options.icon = DefaultIcon;

        setOrangeIcon(
          leafletModule.divIcon({
            className: "custom-div-icon",
            html: `<div class="marker-pin"></div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          })
        );
      });
    }
  }, []); // Run once on client mount

  // Distance utilities imported from lib/geo

  // Guard clause to ensure config is loaded
  if (!authToken) {
    return <div>Waiting for configuration...</div>;
  }

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      try {
        // Use a temporary siteId/collectionId for the query, as the JWT will contain the real ones
        const response = await fetch(
          `${apiBaseUrl || ""}/api/locations?site_id=temp&collection_id=temp`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.ok) {
          const data = (await response.json()) as Store[];
          const storesToGeocode = data.filter(
            (store) =>
              store.fieldData.address &&
              (store.fieldData.latitude === undefined ||
                store.fieldData.longitude === undefined ||
                store.fieldData.latitude === null ||
                store.fieldData.longitude === null)
          );

          if (storesToGeocode.length > 0) {
            const geocodeResp = await fetch(`${apiBaseUrl || ""}/api/geocode`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
              body: JSON.stringify({
                // siteId is now implicit from the token on the backend
                locations: storesToGeocode.map((s) => ({
                  id: s.id,
                  address: s.fieldData.address,
                })),
              }),
            });

            if (geocodeResp.ok) {
              const { geocodedLocations } = (await geocodeResp.json()) as {
                geocodedLocations: GeocodedLocation[];
              };
              const geocodedMap = new Map(
                geocodedLocations.map((l) => [
                  l.id,
                  { latitude: l.latitude, longitude: l.longitude },
                ])
              );

              const storesWithCoords = data.map((store) => {
                if (geocodedMap.has(store.id)) {
                  return {
                    ...store,
                    fieldData: {
                      ...store.fieldData,
                      ...geocodedMap.get(store.id),
                    } as Store["fieldData"],
                  };
                }
                return store;
              });
              setAllStores(storesWithCoords);
              // Ensure displayedStores also gets proper StoreWithDistance types
              setDisplayedStores(
                mapStoresToStoreWithDistance(storesWithCoords)
              );
            }
          } else {
            setAllStores(data);
            setDisplayedStores(mapStoresToStoreWithDistance(data));
          }
        }
      } catch (error) {
        console.error("Failed to fetch stores", error);
      } finally {
        setLoading(false);
      }
    };

    if (authToken) {
      fetchStores();
    }
  }, [apiBaseUrl, authToken]);

  useEffect(() => {
    if (L && mapContainer && !mapRef.current && authToken && mapStyle) {
      mapRef.current = L.map(mapContainer, {
        zoomControl: false, // Disable default zoom control
      }).setView([40.7128, -74.006], 12); // Centered on NYC

      // Use the local tile endpoint, passing the JWT and style
      L.tileLayer(
        `${
          apiBaseUrl || ""
        }/api/maps/tiles/{z}/{x}/{y}.png?token=${authToken}&style=${mapStyle}`,
        {
          attribution:
            '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          tileSize: 512,
          zoomOffset: -1,
        }
      ).addTo(mapRef.current);

      L.control.zoom({ position: "bottomright" }).addTo(mapRef.current);
    }
  }, [L, mapContainer, authToken, mapStyle]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, [loading]);

  useEffect(() => {
    if (!mapContainer || !mapRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      mapRef.current?.invalidateSize();
    });

    resizeObserver.observe(mapContainer);

    return () => {
      resizeObserver.disconnect();
    };
  }, [mapContainer]);

  useEffect(() => {
    if (L && orangeIcon && mapRef.current) {
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current?.removeLayer(layer);
        }
      });

      const validStores = displayedStores.filter(
        (store) =>
          typeof store.fieldData.latitude === "number" &&
          typeof store.fieldData.longitude === "number"
      );

      validStores.forEach((store) => {
        if (
          typeof store.fieldData.latitude === "number" &&
          typeof store.fieldData.longitude === "number"
        ) {
          L.marker([store.fieldData.latitude, store.fieldData.longitude], {
            icon: orangeIcon,
          })
            .addTo(mapRef.current as L.Map)
            .bindPopup(
              `<b>${store.fieldData.name}</b><br>${store.fieldData.address}`,
              {
                className: "custom-popup",
              }
            );
        }
      });
    }
  }, [displayedStores, L, orangeIcon]); // Add L and orangeIcon to dependency array

  const mapStoresToStoreWithDistance = (
    stores: Store[]
  ): StoreWithDistance[] => {
    return stores.map((store) => {
      const distance = store.distance ?? Infinity; // Use existing distance or default
      return { ...store, distance };
    });
  };

  const sortStoresByDistance = (latitude: number, longitude: number) => {
    const sortedStores = allStores
      .map((store): StoreWithDistance => {
        const dist =
          typeof store.fieldData.latitude === "number" &&
          typeof store.fieldData.longitude === "number"
            ? getDistanceKm(
                latitude,
                longitude,
                store.fieldData.latitude,
                store.fieldData.longitude
              )
            : Infinity;
        return { ...store, distance: dist };
      })
      .sort((a, b) => a.distance - b.distance);
    setDisplayedStores(sortedStores);
  };

  const handleSelectStore = (store: Store) => {
    setSelectedStore(store);
    if (
      mapRef.current &&
      typeof store.fieldData.latitude === "number" &&
      typeof store.fieldData.longitude === "number"
    ) {
      mapRef.current.flyTo(
        [store.fieldData.latitude, store.fieldData.longitude],
        15
      );
    }
  };

  const handleCurrentLocation = async () => {
    if (window.isSecureContext === false) {
      alert(
        "Geolocation is not available on insecure connections. Please use HTTPS or localhost."
      );
      return;
    }
    const permissionState = await requestGeoPermission();

    if (permissionState === "denied") {
      alert(
        "You have blocked location services. To use this feature, please enable location permissions in your browser settings."
      );
      return;
    }

    if (navigator.geolocation) {
      setGeoLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (mapRef.current) {
            mapRef.current.setView(
              [position.coords.latitude, position.coords.longitude],
              13
            );
          }
          sortStoresByDistance(latitude, longitude);
          setGeoLoading(false);
        },
        (error) => {
          // Handle errors, e.g., user denied permission
          console.error("Geolocation error:", error);
          alert(
            "Could not get your location. Please ensure you've granted permission."
          );
          setGeoLoading(false);
        }
      );
    } else {
      // Fallback for when geolocation is not supported
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "" || !authToken) return;
    try {
      const geocodeResp = await fetch(
        `${apiBaseUrl || ""}/api/geocode?address=${encodeURIComponent(
          searchTerm
        )}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (geocodeResp.ok) {
        const geocodeData = (await geocodeResp.json()) as GeocodeApiResponse;
        if (geocodeData.features && geocodeData.features.length > 0) {
          const [longitude, latitude] = geocodeData.features[0].center;
          if (mapRef.current) {
            mapRef.current.flyTo([latitude, longitude], 13);
          }
          sortStoresByDistance(latitude, longitude);
        } else {
          alert("Location not found.");
        }
      }
    } catch (error) {
      console.error("Geocoding search error:", error);
      alert("Error searching for location.");
    }
  };

  return (
    <div className="store-locator-view">
      <aside className="sidebar">
        <div className="search-card">
          <p className="search-title">Enter your city name & click "search"</p>
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search for a studio"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
          <button
            onClick={handleCurrentLocation}
            className={`current-location-button ${
              geoLoading ? "geo-loading" : ""
            }`}
          >
            Use current location
          </button>
        </div>
        <div className="store-list">
          <p className="list-title">
            {displayedStores.length} Nearest Locations
          </p>
          {displayedStores.map((store) => (
            <div
              key={store.id}
              className={`store-card ${
                selectedStore?.id === store.id ? "selected" : ""
              }`}
              onClick={() => handleSelectStore(store)}
            >
              <h3>{store.fieldData.name}</h3>
              <p>{store.fieldData.address}</p>
              <p>{store.fieldData.phone}</p>
              {isFinite(store.distance) && (
                <p className="store-distance">
                  {distanceUnit === "mi"
                    ? kilometersToMiles(store.distance).toFixed(1)
                    : store.distance.toFixed(1)}{" "}
                  {distanceUnit} away
                </p>
              )}
            </div>
          ))}
        </div>
      </aside>
      <main className="map-area">
        <div ref={(node) => setMapContainer(node)} className="map-container" />
        {loading && <div className="loading-overlay">Loading stores...</div>}
      </main>
    </div>
  );
};

export default StoreLocator;
