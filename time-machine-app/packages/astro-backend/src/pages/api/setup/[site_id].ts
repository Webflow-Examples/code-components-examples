import type { APIRoute } from "astro";
import { createDb } from "../../../lib/db";
import { sites } from "../../../lib/db/schema";
import { eq } from "drizzle-orm";

export const POST: APIRoute = async ({ request, params, locals }) => {
  const { site_id } = params;
  const { DB } = locals.runtime.env;

  if (!site_id) {
    return new Response("Site ID is required", { status: 400 });
  }

  const { mapboxKey } = await request.json();

  if (typeof mapboxKey !== "string" || !mapboxKey) {
    return new Response("Mapbox key is required", { status: 400 });
  }

  const db = createDb(DB);

  try {
    await db
      .update(sites)
      .set({ mapboxKey: mapboxKey })
      .where(eq(sites.siteId, site_id));
  } catch (e) {
    console.error("Failed to save Mapbox key to D1:", e);
    return new Response("Failed to save configuration", { status: 500 });
  }

  return new Response("Configuration saved successfully!");
};
