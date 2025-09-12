import type { APIRoute } from "astro";
import { createDb } from "../../../../lib/db";
import { sites } from "../../../../lib/db/schema";

export const GET: APIRoute = async ({ url, redirect, locals }) => {
  const { WEBFLOW_CLIENT_ID, WEBFLOW_CLIENT_SECRET } = locals.runtime.env;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state"); // This will be our origin
  const origin = state;

  if (!code) {
    return new Response("Authorization code is missing", { status: 400 });
  }

  const response = await fetch("https://api.webflow.com/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: WEBFLOW_CLIENT_ID,
      client_secret: WEBFLOW_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
    }),
  });

  if (!response.ok) {
    console.error("Failed to fetch access token:", await response.text());
    return new Response("Failed to obtain access token", { status: 500 });
  }

  const tokenData: { access_token: string } = await response.json();
  const { access_token } = tokenData;

  // Introspect the token to get authorization details, including site ID
  const introspectResponse = await fetch(
    "https://api.webflow.com/v2/token/introspect",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (!introspectResponse.ok) {
    console.error(
      "Failed to introspect token:",
      await introspectResponse.text()
    );
    return new Response("Failed to introspect token", { status: 500 });
  }

  const introspectData: any = await introspectResponse.json();
  const site_id = introspectData.authorization.authorizedTo.siteIds[0]; // Get the first site ID

  const { DB } = locals.runtime.env;
  const db = createDb(DB);

  try {
    await db
      .insert(sites)
      .values({
        siteId: site_id,
        webflowAccessToken: access_token,
      })
      .onConflictDoUpdate({
        target: sites.siteId,
        set: {
          webflowAccessToken: access_token,
        },
      });
  } catch (e) {
    console.error("Failed to save to D1:", e);
    return new Response("Failed to save site configuration", { status: 500 });
  }

  if (origin) {
    return redirect(
      `/auth-success?origin=${encodeURIComponent(origin)}&site_id=${site_id}`
    );
  }
  return redirect(`/setup?site_id=${site_id}`); // Fallback
};
