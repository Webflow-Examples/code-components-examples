import type { APIRoute } from "astro";
import { createDb } from "../../lib/db";
import { site as siteSchema } from "../../lib/db/schema";
import { and, eq } from "drizzle-orm";
import { createAuth } from "../../lib/auth";
import { createClient } from "../../lib/webflow";

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

  // Old session-based auth is no longer needed here
  // const session = await createAuth(locals).api.getSession({
  //   headers: request.headers,
  // });
  // if (!session) {
  //   return new Response("Unauthorized", { status: 401 });
  // }

  const cacheKey = `locations:${collectionId}`;
  const cached = await CACHE.get(cacheKey, "json");
  if (cached) {
    return new Response(JSON.stringify(cached), {
      headers: { "Content-Type": "application/json" },
    });
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
    // Cache the response
    await CACHE.put(cacheKey, JSON.stringify(list?.items), {
      expirationTtl: 3600,
    });

    return new Response(JSON.stringify(list), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch items from Webflow", error);
    return new Response("Failed to fetch items from Webflow", { status: 500 });
  }
};
