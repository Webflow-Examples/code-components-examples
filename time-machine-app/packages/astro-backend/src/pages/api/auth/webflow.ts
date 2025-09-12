import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url, redirect, locals }) => {
  const { WEBFLOW_CLIENT_ID } = locals.runtime.env;
  const origin = url.searchParams.get("origin");

  const authUrl = new URL("https://webflow.com/oauth/authorize");
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", WEBFLOW_CLIENT_ID);
  authUrl.searchParams.set("scope", "cms:read");
  if (origin) {
    authUrl.searchParams.set("state", origin); // Pass the component's origin in the state parameter
  }

  return redirect(authUrl.toString());
};
