import type { APIContext } from "astro";
import { createDb } from "../../../lib/db";
import { site as siteSchema } from "../../../lib/db/schema";
import { eq } from "drizzle-orm";
import { createAuth } from "../../../lib/auth";

export const POST = async (context: APIContext) => {
  const { locals, request } = context;
  const db = createDb(locals.runtime.env.DB);
  const auth = createAuth(locals);
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { siteId, mapboxKey } = await request.json();

  if (!siteId) {
    return new Response("Site ID is required", { status: 400 });
  }

  try {
    await db
      .update(siteSchema)
      .set({ mapboxKey })
      .where(eq(siteSchema.siteId, siteId));

    return new Response("Mapbox settings saved", { status: 200 });
  } catch (error) {
    console.error("Failed to save Mapbox settings:", error);
    return new Response("Failed to save Mapbox settings", { status: 500 });
  }
};
