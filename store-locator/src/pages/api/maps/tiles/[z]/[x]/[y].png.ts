import type { APIRoute } from "astro";
import { createDb } from "../../../../../../lib/db";
import { site as siteSchema } from "../../../../../../lib/db/schema";
import { eq } from "drizzle-orm";
import { parseMapboxStyle } from "../../../../../../lib/mapbox";

/**
 * GET /api/maps/tiles/{z}/{x}/{y}.png?style=...
 *
 * Proxies Mapbox raster style tiles using the site-specific token from D1.
 * Requires a JWT (accepted via Authorization header or token query param).
 */
export const GET: APIRoute = async ({ params, locals, url }) => {
  const { x, y, z } = params;
  const authToken = locals.authToken;

  if (!authToken) {
    return new Response("Unauthorized: Missing auth token.", {
      status: 401,
    });
  }

  const { siteId } = authToken;

  if (!siteId || !x || !y || !z) {
    return new Response("Site ID, x, y, and z parameters are required", {
      status: 400,
    });
  }

  const { DB } = locals.runtime.env;
  const db = createDb(DB);

  try {
    const site = (
      await db
        .select({
          mapboxKey: siteSchema.mapboxKey,
        })
        .from(siteSchema)
        .where(eq(siteSchema.siteId, siteId))
        .limit(1)
    )[0];

    if (!site || !site.mapboxKey) {
      return new Response("Mapbox key not configured for this site", {
        status: 404,
      });
    }

    // --- Start of new parsing logic ---
    const styleQuery = (url.searchParams.get("style") || "streets-v11").trim();
    const parsed = parseMapboxStyle(styleQuery);

    if (!parsed) {
      console.error("Failed to parse Mapbox style URL:", styleQuery);
      return new Response(
        "Invalid Mapbox style URL format. Please use 'username/style_id' or a full Mapbox style URL.",
        { status: 400 }
      );
    }
    const { user: mapboxUser, styleId: mapboxStyleId } = parsed;
    // --- End of new parsing logic ---

    const tileUrl = `https://api.mapbox.com/styles/v1/${mapboxUser}/${mapboxStyleId}/tiles/512/${z}/${x}/${y}@2x?access_token=${site.mapboxKey}`;

    const response = await fetch(tileUrl);

    if (!response.ok) {
      return new Response("Error fetching tile from Mapbox", {
        status: response.status,
      });
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400", // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error("Tile fetching error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
