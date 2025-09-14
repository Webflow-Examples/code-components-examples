import type { APIRoute } from "astro";
import { createDb } from "../../lib/db";
import { site as siteSchema } from "../../lib/db/schema";
import { eq } from "drizzle-orm";

interface GeocodeRequestItem {
  id: string;
  address: string;
}

interface MapboxGeocodeResponse {
  type: "FeatureCollection";
  query: string[];
  features: {
    id: string;
    type: "Feature";
    place_type: string[];
    relevance: number;
    properties: {
      mapbox_id: string;
      wikidata?: string;
    };
    text: string;
    place_name: string;
    bbox?: [number, number, number, number];
    center: [number, number];
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
    context?: {
      id: string;
      mapbox_id: string;
      wikidata?: string;
      text: string;
      short_code?: string;
    }[];
  }[];
  attribution: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  const { locations } = (await request.json()) as {
    locations: GeocodeRequestItem[];
  };

  const authToken = locals.authToken;
  if (!authToken) {
    return new Response("Unauthorized: Missing auth token in route.", {
      status: 401,
    });
  }
  const { siteId } = authToken;

  if (!siteId || !locations || locations.length === 0) {
    return new Response("Site ID from token and locations are required", {
      status: 400,
    });
  }

  const { DB } = locals.runtime.env;
  const db = createDb(DB);

  const site = (
    await db
      .select()
      .from(siteSchema)
      .where(eq(siteSchema.siteId, siteId))
      .limit(1)
  )[0];

  if (!site || !site.mapboxKey) {
    return new Response("Mapbox key not configured for this site", {
      status: 404,
    });
  }

  const geocodingPromises = locations.map(async (location) => {
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      location.address
    )}.json?access_token=${site.mapboxKey}`;
    const response = await fetch(geocodeUrl);
    if (response.ok) {
      const data = (await response.json()) as MapboxGeocodeResponse;
      if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center;
        return {
          id: location.id,
          latitude,
          longitude,
        };
      }
    }
    return null;
  });

  const geocodedLocations = (await Promise.all(geocodingPromises)).filter(
    Boolean
  );

  return new Response(JSON.stringify({ geocodedLocations }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const GET: APIRoute = async ({ request, locals }) => {
  const url = new URL(request.url);
  const address = url.searchParams.get("address");

  const authToken = locals.authToken;
  if (!authToken) {
    return new Response("Unauthorized: Missing auth token in route.", {
      status: 401,
    });
  }
  const { siteId } = authToken;

  if (!address || !siteId) {
    return new Response("Address and Site ID from token are required", {
      status: 400,
    });
  }

  const { DB } = locals.runtime.env;
  const db = createDb(DB);

  const site = (
    await db
      .select()
      .from(siteSchema)
      .where(eq(siteSchema.siteId, siteId))
      .limit(1)
  )[0];

  if (!site || !site.mapboxKey) {
    return new Response("Mapbox key not configured for this site", {
      status: 404,
    });
  }

  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${site.mapboxKey}`;

  try {
    const response = await fetch(geocodeUrl);
    if (!response.ok) {
      return new Response("Failed to fetch from Mapbox", {
        status: response.status,
      });
    }
    const data = (await response.json()) as MapboxGeocodeResponse;
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Geocoding failed:", error);
    return new Response("Geocoding service failed", { status: 500 });
  }
};
