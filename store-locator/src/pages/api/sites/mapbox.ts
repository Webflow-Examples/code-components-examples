import type { APIRoute } from "astro";
import { createAuth } from "../../../lib/auth";
import { site as siteSchema } from "../../../lib/db/schema";
import { and, eq } from "drizzle-orm";
import { createDb } from "../../../lib/db";

export const POST: APIRoute = async ({ request, locals }) => {
  const { DB } = locals.runtime.env;
  const db = createDb(DB);

  const session = await createAuth(locals).api.getSession({
    headers: request.headers,
  });
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { siteId, mapboxKey } = (await request.json()) as {
    siteId: string;
    mapboxKey: string;
  };

  if (!siteId || !mapboxKey) {
    return new Response("Site ID and Mapbox Key are required", {
      status: 400,
    });
  }

  try {
    // Verify the site belongs to the user before updating
    const site = await db
      .select()
      .from(siteSchema)
      .where(
        and(
          eq(siteSchema.siteId, siteId),
          eq(siteSchema.userId, session.user.id)
        )
      )
      .limit(1);

    if (site.length === 0) {
      return new Response("Site not found or access denied", { status: 404 });
    }

    await db
      .update(siteSchema)
      .set({ mapboxKey: mapboxKey })
      .where(eq(siteSchema.siteId, siteId));

    return new Response(
      JSON.stringify({ message: "Mapbox key saved successfully" }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Failed to save mapbox key:", error);
    return new Response("Failed to save mapbox key", { status: 500 });
  }
};
