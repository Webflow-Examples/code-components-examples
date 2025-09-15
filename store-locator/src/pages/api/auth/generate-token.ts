import type { APIRoute } from "astro";
import jwt from "jsonwebtoken";
import { createDb } from "../../../lib/db";
import { site as siteTable } from "../../../lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * POST /api/auth/generate-token
 *
 * Issues a short, self-contained JWT used by the Store Locator to call
 * protected endpoints without a user session. The token payload intentionally
 * contains only the data required by the backend:
 * - siteId: which Webflow site configuration to use
 * - collectionId: which CMS collection to read items from
 * - mapboxToken: the site-specific Mapbox access token (not exposed to clients)
 *
 * Security notes:
 * - The secret must come from BETTER_AUTH_SECRET. We fail fast if missing.
 * - Token lifetime is set to 1 year for demo simplicity. Reduce for production.
 */
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { siteId, collectionId } = (await request.json()) as {
      siteId: string;
      collectionId: string;
    };

    if (!siteId || !collectionId) {
      return new Response("siteId and collectionId are required", {
        status: 400,
      });
    }

    const db = createDb(locals.runtime.env.DB);
    const site = await db.query.site.findFirst({
      where: eq(siteTable.siteId, siteId),
    });

    if (!site?.mapboxKey) {
      return new Response("Mapbox key not found for this site", {
        status: 404,
      });
    }

    // Get the auth secret from environment variables
    const authSecret = locals.runtime.env.BETTER_AUTH_SECRET;
    if (!authSecret) {
      return new Response("Server misconfigured: missing auth secret", {
        status: 500,
      });
    }

    // The token contains the necessary info and expires in 1 year
    const token = jwt.sign(
      { siteId, collectionId, mapboxToken: site.mapboxKey },
      authSecret,
      {
        expiresIn: "1y",
      }
    );

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Token generation error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
