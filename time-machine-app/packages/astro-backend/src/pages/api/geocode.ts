import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, locals }) => {
  const { DB, CACHE } = locals.runtime.env;
  const url = new URL(request.url);
  const address = url.searchParams.get("address");
  const siteId = url.searchParams.get("site_id");

  if (!address || !siteId) {
    return new Response("Site ID and address are required", { status: 400 });
  }

  const cacheKey = `geocode:${address}`;
  const cached = await CACHE.get(cacheKey, "json");
  if (cached) {
    return new Response(JSON.stringify(cached), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // 1. Fetch the Mapbox API key from D1
  const siteInfo: any = await DB.prepare(
    "SELECT mapbox_api_key FROM sites WHERE site_id = ?"
  )
    .bind(siteId)
    .first();

  if (!siteInfo || !siteInfo.mapbox_api_key) {
    return new Response("Mapbox API key not configured for this site", {
      status: 404,
    });
  }

  const { mapbox_api_key } = siteInfo;

  // 2. Call the Mapbox Geocoding API
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${mapbox_api_key}`;

  const geocodeResponse = await fetch(geocodeUrl);

  if (!geocodeResponse.ok) {
    return new Response("Failed to fetch geocoding data from Mapbox", {
      status: 500,
    });
  }

  const geocodeData = await geocodeResponse.json();

  // Cache the response
  await CACHE.put(cacheKey, JSON.stringify(geocodeData), {
    expirationTtl: 3600 * 24, // Cache for 24 hours
  });

  // 3. Return the geocoding data
  return new Response(JSON.stringify(geocodeData), {
    headers: { "Content-Type": "application/json" },
  });
};
