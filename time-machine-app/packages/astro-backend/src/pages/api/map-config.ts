import type { APIRoute } from "astro";
import { createDb } from "../../lib/db";
import { sites } from "../../lib/db/schema";
import { eq } from "drizzle-orm";

export const GET: APIRoute = async ({ request, locals }) => {
  const { DB } = locals.runtime.env;
  const url = new URL(request.url);
  const siteId = url.searchParams.get("site_id");

  if (!siteId) {
    return new Response("Site ID is required", { status: 400 });
  }

  const db = createDb(DB);

  try {
    const siteConfig = await db.query.sites.findFirst({
      where: eq(sites.siteId, siteId),
      columns: {
        mapboxKey: true,
      },
    });

    if (!siteConfig || !siteConfig.mapboxKey) {
      return new Response("Mapbox key not found for this site", {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ mapboxKey: siteConfig.mapboxKey }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Failed to fetch map config from D1:", e);
    return new Response("Failed to fetch configuration", { status: 500 });
  }
};
