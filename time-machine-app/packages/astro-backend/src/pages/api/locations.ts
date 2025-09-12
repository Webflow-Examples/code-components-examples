import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, locals }) => {
  const { DB, CACHE } = locals.runtime.env;
  const url = new URL(request.url);
  const collectionId = url.searchParams.get("collection_id");
  const siteId = url.searchParams.get("site_id"); // We'll need this for the access token

  if (!collectionId || !siteId) {
    return new Response("Site ID and Collection ID are required", {
      status: 400,
    });
  }

  const cacheKey = `locations:${collectionId}`;
  const cached = await CACHE.get(cacheKey, "json");
  if (cached) {
    return new Response(JSON.stringify(cached), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // 1. Fetch site configuration from D1 to get the access token
  const siteInfo: any = await DB.prepare(
    "SELECT webflow_access_token FROM sites WHERE site_id = ?"
  )
    .bind(siteId)
    .first();

  if (!siteInfo) {
    return new Response("Site not configured", { status: 404 });
  }

  const { webflow_access_token } = siteInfo;

  // 2. Fetch items from the specified collection
  const itemsResponse = await fetch(
    `https://api.webflow.com/v2/collections/${collectionId}/items`,
    {
      headers: {
        Authorization: `Bearer ${webflow_access_token}`,
      },
    }
  );

  if (!itemsResponse.ok) {
    return new Response("Failed to fetch items from Webflow", { status: 500 });
  }

  const items = await itemsResponse.json();

  // Cache the response
  await CACHE.put(cacheKey, JSON.stringify(items), { expirationTtl: 3600 });

  // 3. Return the items
  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" },
  });
};
