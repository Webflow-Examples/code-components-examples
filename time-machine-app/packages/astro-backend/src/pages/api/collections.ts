import type { APIRoute } from "astro";
import { createDb } from "../../lib/db";
import { sites } from "../../lib/db/schema";

export const GET: APIRoute = async ({ request, locals }) => {
  const { DB, CACHE } = locals.runtime.env;
  const url = new URL(request.url);
  const siteId = url.searchParams.get("site_id");
  console.log(`[collections] Received request for siteId: ${siteId}`);

  if (!siteId) {
    return new Response("Site ID is required", { status: 400 });
  }

  const cacheKey = `collections:${siteId}`;
  const cached = await CACHE.get(cacheKey, "json");
  if (cached) {
    return new Response(JSON.stringify(cached), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const db = createDb(DB);
  const siteInfo = await db.query.sites.findFirst({
    where: (sites, { eq }) => eq(sites.siteId, siteId),
  });
  console.log(`[collections] DB result for siteId ${siteId}:`, siteInfo);

  if (!siteInfo) {
    return new Response("Site not configured", { status: 404 });
  }

  const { webflowAccessToken } = siteInfo;

  const collectionsResponse = await fetch(
    `https://api.webflow.com/v2/sites/${siteId}/collections`,
    {
      headers: {
        Authorization: `Bearer ${webflowAccessToken}`,
      },
    }
  );

  if (!collectionsResponse.ok) {
    const errorText = await collectionsResponse.text();
    console.error(
      `[collections] Failed to fetch collections from Webflow for siteId ${siteId}. Status: ${collectionsResponse.status}. Body: ${errorText}`
    );
    return new Response("Failed to fetch collections from Webflow", {
      status: 500,
    });
  }

  const collections = await collectionsResponse.json();

  // Cache the response for 1 hour
  await CACHE.put(cacheKey, JSON.stringify(collections), {
    expirationTtl: 3600,
  });

  return new Response(JSON.stringify(collections), {
    headers: { "Content-Type": "application/json" },
  });
};
