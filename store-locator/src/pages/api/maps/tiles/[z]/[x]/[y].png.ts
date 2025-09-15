import type { APIRoute } from "astro";
import { createDb } from "../../../../../../lib/db";
import { site as siteSchema } from "../../../../../../lib/db/schema";
import { eq } from "drizzle-orm";

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
    let mapboxUser, mapboxStyleId;
    const style = (url.searchParams.get("style") || "streets-v11").trim();

    console.log("Parsing Mapbox style URL:", style);

    // Regex to capture username and style_id from various Mapbox URL formats
    const patterns = [
      /^mapbox:\/\/styles\/([^/]+)\/([^/]+)$/, // mapbox://styles/user/style
      /styles\/v1\/([^/]+)\/([^/]+)/, // full URL e.g. api.mapbox.com/styles/v1/user/style
      /^([^/]+)\/([^/]+)$/, // user/style
    ];

    let matched = false;
    for (const pattern of patterns) {
      const match = style.match(pattern);
      if (match && match[1] && match[2]) {
        mapboxUser = match[1];
        mapboxStyleId = match[2];
        matched = true;
        break;
      }
    }

    // If no patterns matched, assume it's a Mapbox-owned style ID like "streets-v11"
    if (!matched && !style.includes("/")) {
      mapboxUser = "mapbox";
      mapboxStyleId = style;
    }

    if (!mapboxUser || !mapboxStyleId) {
      console.error("Failed to parse Mapbox style URL:", style);
      return new Response(
        "Invalid Mapbox style URL format. Please use 'username/style_id' or a full Mapbox style URL.",
        { status: 400 }
      );
    }
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
