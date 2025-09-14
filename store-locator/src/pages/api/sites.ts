import type { APIContext } from "astro";
import { createAuth } from "../../lib/auth";
import { createDb } from "../../lib/db";
import {
  site as siteSchema,
  account as accountSchema,
} from "../../lib/db/schema";
import { createClient } from "../../lib/webflow";
import { eq } from "drizzle-orm";

export const GET = async (context: APIContext) => {
  const { locals } = context;
  const db = createDb(locals.runtime.env.DB);
  const auth = createAuth(locals);
  const session = await auth.api.getSession({
    headers: context.request.headers,
  });

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Get the user's Webflow account to retrieve the access token
  const userWebflowAccount = await db
    .select()
    .from(accountSchema)
    .where(eq(accountSchema.userId, session.user.id))
    .then((accounts) => accounts.find((acc) => acc.providerId === "webflow"));

  if (!userWebflowAccount || !userWebflowAccount.accessToken) {
    return new Response("Webflow account not connected or token is missing.", {
      status: 403,
    });
  }
  const token = userWebflowAccount.accessToken;

  // Get user's sites from our DB
  let userSites = await db
    .select()
    .from(siteSchema)
    .where(eq(siteSchema.userId, session.user.id));

  // If no sites are in the DB, fetch them from Webflow and store them
  if (userSites.length === 0) {
    const webflow = createClient(token);
    const webflowSites = await webflow.sites.list();

    if (webflowSites.sites && webflowSites.sites.length > 0) {
      const sitesToInsert = webflowSites.sites.map((site: any) => ({
        siteId: site.id,
        userId: session.user.id,
        webflowAccessToken: token,
      }));

      await db.insert(siteSchema).values(sitesToInsert).onConflictDoNothing();
      // Re-fetch the sites from our DB
      userSites = await db
        .select()
        .from(siteSchema)
        .where(eq(siteSchema.userId, session.user.id));
    }
  }

  try {
    // 1. Create a user-specific Webflow client
    const webflow = createClient(token);

    // 2. Fetch sites from Webflow API to ensure the list is up-to-date
    const webflowSites = await webflow.sites.list();

    // 3. Combine the data
    const sitesWithPreferences = webflowSites.sites?.map((site: any) => {
      const dbSite = userSites.find((s) => s.siteId === site.id);
      return {
        ...site,
        selectedCollectionId: dbSite ? dbSite.selectedCollectionId : null,
        mapboxKey: dbSite ? dbSite.mapboxKey : null,
      };
    });

    return new Response(JSON.stringify(sitesWithPreferences), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch sites:", error);
    return new Response("Failed to fetch sites from Webflow", { status: 500 });
  }
};
