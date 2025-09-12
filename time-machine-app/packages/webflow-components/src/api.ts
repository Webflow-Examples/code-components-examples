import type { WebflowItem } from "./types";

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      `API Error: ${response.status} ${response.statusText}`,
      errorText
    );
    throw new Error(`Failed to fetch: ${response.url}`);
  }
  return response.json();
};

export const fetchCollections = async (backendUrl: string, siteId: string) => {
  const response = await fetch(
    `${backendUrl}/api/collections?site_id=${siteId}`
  );
  const data = await handleResponse(response);
  return data.collections;
};

export const fetchMapConfig = async (backendUrl: string, siteId: string) => {
  const response = await fetch(
    `${backendUrl}/api/map-config?site_id=${siteId}`
  );
  return handleResponse(response);
};

export const fetchLocations = async (
  backendUrl: string,
  collectionId: string,
  siteId: string
) => {
  const response = await fetch(
    `${backendUrl}/api/locations?collection_id=${collectionId}&site_id=${siteId}`
  );
  const data = await handleResponse(response);
  return data.items.map((item: WebflowItem) => ({
    id: item.id,
    name: item.fieldData.name,
    address: item.fieldData.address,
    lat: item.fieldData.latitude,
    lng: item.fieldData.longitude,
    phone: item.fieldData["phone-number"],
  }));
};

export const geocodeAddress = async (
  backendUrl: string,
  address: string,
  siteId: string | undefined
) => {
  const response = await fetch(
    `${backendUrl}/api/geocode?address=${encodeURIComponent(
      address
    )}&site_id=${siteId}`
  );
  return handleResponse(response);
};

export const saveMapboxKey = async (
  backendUrl: string,
  siteId: string,
  key: string
) => {
  await fetch(`${backendUrl}/api/setup/${siteId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mapboxKey: key }),
  });
};
