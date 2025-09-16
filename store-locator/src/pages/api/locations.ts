import type { APIRoute } from "astro";
import { createDb } from "../../lib/db";
import { site as siteSchema } from "../../lib/db/schema";
import { and, eq } from "drizzle-orm";
import { createClient } from "../../lib/webflow";

/**
 * GET /api/locations
 *
 * Returns items from the configured Webflow CMS collection. Requires a
 * Bearer JWT created by /api/auth/generate-token. The middleware validates
 * the token and places its payload at locals.authToken.
 */
export const GET: APIRoute = async ({ request, locals }) => {
  const { DB, CACHE } = locals.runtime.env;
  const db = createDb(DB);

  // JWT payload is decoded and attached by the middleware
  const authToken = locals.authToken;
  if (!authToken) {
    return new Response("Unauthorized: Missing auth token in route.", {
      status: 401,
    });
  }
  const { siteId, collectionId } = authToken;

  if (!collectionId || !siteId) {
    return new Response("Invalid auth token", {
      status: 400,
    });
  }

  // Session-based auth is not required; the JWT is the source of truth

  const cacheKey = `locations:${collectionId}`;
  const cached = (await CACHE.get(cacheKey, "json")) as unknown;
  if (cached) {
    // Backward compatible: handle previous cache shape where full object was stored
    let items: any[] | undefined;
    if (Array.isArray(cached)) {
      items = cached as any[];
    } else if (
      cached &&
      typeof cached === "object" &&
      Array.isArray((cached as any).items)
    ) {
      items = (cached as any).items as any[];
    }
    if (items) {
      return new Response(JSON.stringify(items), {
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // 1. Fetch site configuration from D1 to get the access token
  const site = (
    await db
      .select()
      .from(siteSchema)
      .where(
        and(
          eq(siteSchema.siteId, siteId)
          // userId check can be removed if the token is the source of truth
          // eq(siteSchema.userId, session.user.id)
        )
      )
      .limit(1)
  )[0];

  if (!site) {
    return new Response("Site not configured or access denied", {
      status: 404,
    });
  }

  const { webflowAccessToken } = site;

  // 2. Fetch items from the specified collection
  try {
    const webflow = createClient(webflowAccessToken);
    const list = await webflow.collections.items.listItems(collectionId);
    const items = list?.items ?? [];
    // Cache just the items array for client consumption
    await CACHE.put(cacheKey, JSON.stringify(items), {
      expirationTtl: 3600,
    });

    return new Response(JSON.stringify(items), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch items from Webflow", error);
    return new Response("Failed to fetch items from Webflow", { status: 500 });
  }
};
