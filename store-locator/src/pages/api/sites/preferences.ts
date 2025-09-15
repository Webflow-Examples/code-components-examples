import type { APIContext } from "astro";
import { createDb } from "../../../lib/db";
import { site as siteSchema } from "../../../lib/db/schema";
import { eq } from "drizzle-orm";
import { createAuth } from "../../../lib/auth";

/**
 * POST /api/sites/preferences
 * Stores a selected collection ID against a site for the authenticated user.
 */
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

  const { siteId, collectionId } = (await request.json()) as {
    siteId: string;
    collectionId: string;
  };

  if (!siteId) {
    return new Response("Site ID is required", { status: 400 });
  }

  try {
    await db
      .update(siteSchema)
      .set({ selectedCollectionId: collectionId })
      .where(eq(siteSchema.siteId, siteId));

    return new Response("Preferences saved", { status: 200 });
  } catch (error) {
    console.error("Failed to save preferences:", error);
    return new Response("Failed to save preferences", { status: 500 });
  }
};
