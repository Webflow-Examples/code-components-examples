import type { APIRoute } from "astro";
import { createAuth } from "../../lib/auth";
import { createClient } from "../../lib/webflow";
import { createDb } from "../../lib/db";
import { site as siteSchema } from "../../lib/db/schema";
import { and, eq } from "drizzle-orm";

/**
 * GET /api/collections?site_id=...
 * Returns Webflow CMS collections for the authenticated user's site.
 * Requires a BetterAuth session (used only during setup, not embed usage).
 */
export const GET: APIRoute = async ({ request, locals }) => {
  const { CACHE, DB } = locals.runtime.env;
  const db = createDb(DB);
  const url = new URL(request.url);
  const siteId = url.searchParams.get("site_id");

  if (!siteId) {
    return new Response("Site ID is required", { status: 400 });
  }

  const auth = createAuth(locals);
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Get the specific site for the user
  const site = (
    await db
      .select()
      .from(siteSchema)
      .where(
        and(
          eq(siteSchema.siteId, siteId),
          eq(siteSchema.userId, session.user.id)
        )
      )
      .limit(1)
  )[0];

  if (!site) {
    return new Response("Site not found or access denied", { status: 404 });
  }

  const token = site.webflowAccessToken;
  if (!token) {
    return new Response("No Webflow token found for this site", {
      status: 401,
    });
  }

  const cacheKey = `collections:${siteId}:${token.slice(-6)}`;
  const cached = await CACHE.get(cacheKey, "json");
  if (cached) {
    return new Response(JSON.stringify(cached), {
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const webflow = createClient(token);
    const collections = await webflow.collections.list(siteId);

    // Cache the response for 1 hour
    await CACHE.put(cacheKey, JSON.stringify(collections), {
      expirationTtl: 3600,
    });

    return new Response(JSON.stringify(collections), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch collections:", error);
    return new Response("Failed to fetch collections from Webflow", {
      status: 500,
    });
  }
};
