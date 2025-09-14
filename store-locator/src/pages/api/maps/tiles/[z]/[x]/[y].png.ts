import type { APIRoute } from "astro";
import { createDb } from "../../../../../../lib/db";
import { site as siteSchema } from "../../../../../../lib/db/schema";
import { eq } from "drizzle-orm";

export const GET: APIRoute = async ({ params, request, locals }) => {
  let { z, x, y } = params;
  const url = new URL(request.url);
  const style = url.searchParams.get("style") || "mapbox/streets-v12";
  console.log(request);

  const authToken = locals.authToken;
  if (!authToken) {
    // This case should be handled by middleware, but as a fallback:
    return new Response("Unauthorized: Missing auth token in route.", {
      status: 401,
    });
  }
  const { siteId } = authToken;

  if (!siteId) {
    return new Response("Site ID from token is required", { status: 400 });
  }

  // Handle retina screen resolution
  const retina = y?.includes("@2x");
  if (retina) {
    y = y?.replace("@2x", "");
  }

  const { DB, CACHE } = locals.runtime.env;
  const db = createDb(DB);

  // Define a unique cache key for the tile
  const cacheKey = `tile:${siteId}:${style}:${z}:${x}:${y}${
    retina ? "@2x" : ""
  }`;

  // Try to get the tile from the cache first
  try {
    const cachedTile = await CACHE.get(cacheKey, "arrayBuffer");
    if (cachedTile) {
      return new Response(cachedTile, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=604800", // Cache for 1 week
          "X-Cache-Status": "hit",
        },
      });
    }
  } catch (e) {
    // KV Cache read errors are not critical, so we can fail silently
    // and proceed to fetch from the source.
    // console.error("KV Cache read error:", e);
  }

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

  const styleId = style;
  const retinaSuffix = retina ? "@2x" : "";
  const mapboxUrl = `https://api.mapbox.com/styles/v1/${styleId}/tiles/${z}/${x}/${y}${retinaSuffix}?access_token=${site.mapboxKey}`;

  try {
    const response = await fetch(mapboxUrl, {
      headers: {
        "User-Agent": "Astro Mapbox Proxy",
      },
    });

    if (!response.ok) {
      return new Response("Failed to fetch tile from Mapbox", {
        status: response.status,
      });
    }

    const imageBuffer = await response.arrayBuffer();

    // Store the fetched tile in the cache for future requests
    try {
      await CACHE.put(cacheKey, imageBuffer, {
        expirationTtl: 604800, // Cache for 1 week
      });
    } catch (e) {
      // A cache write failure is not a critical error.
      // The app can continue to function, subsequent requests will just be a cache miss.
      // console.error("KV Cache write error:", e);
    }

    return new Response(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=604800", // Cache for 1 week
        "X-Cache-Status": "miss",
      },
    });
  } catch (error) {
    console.error("Failed to fetch from Mapbox:", error);
    return new Response("Error fetching from Mapbox", { status: 500 });
  }
};
