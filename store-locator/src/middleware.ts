import { defineMiddleware } from "astro:middleware";
import jwt from "jsonwebtoken";

export const onRequest = defineMiddleware(async (context, next) => {
  console.log(`[MIDDLEWARE] Processing request to: ${context.url.pathname}`);
  const AUTH_SECRET = context.locals.runtime.env.BETTER_AUTH_SECRET;
  const origin = context.request.headers.get("Origin");
  console.log(`[MIDDLEWARE] Origin: ${origin}`);

  // Allow Webflow domains and localhost for development
  const allowedOrigins = [
    "http://localhost:4321",
    "http://localhost:3000",
    "https://webflow.com",
    "https://*.webflow.com",
    "https://*.design.webflow.com",
    "https://*.webflow.io",
    "https://my-astro-app.victoria-l-plummer.workers.dev",
    "null",
  ];

  const isAllowedOrigin =
    origin &&
    (allowedOrigins.some((allowed) =>
      allowed.includes("*")
        ? origin.includes(allowed.replace("*", ""))
        : origin === allowed
    ) ||
      (origin.startsWith("https://webflow-") &&
        origin.includes(".design.webflow.com")));

  console.log(`[MIDDLEWARE] isAllowedOrigin: ${isAllowedOrigin}`);

  const corsHeaders = {
    "Access-Control-Allow-Origin": isAllowedOrigin ? origin || "null" : "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With, Accept, Origin",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400", // 24 hours
  };

  // Handle preflight OPTIONS requests for CORS
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // Define which routes are protected
  // Note: The base path is /map, so API routes are at /map/api/...
  const protectedRoutes = /^\/map\/api\/(locations|geocode|maps)/;

  if (protectedRoutes.test(context.url.pathname)) {
    console.log(
      `[MIDDLEWARE] Protected route detected: ${context.url.pathname}`
    );
    const authHeader = context.request.headers.get("Authorization");
    let token = authHeader?.split(" ")[1];

    // For map tile requests, token may be in the query string
    if (!token && context.url.pathname.includes("/api/maps/tiles")) {
      token = context.url.searchParams.get("token") || undefined;
    }

    if (!token) {
      console.log(
        `[MIDDLEWARE] No token found for protected route: ${context.url.pathname}`
      );
      return new Response("Unauthorized: Missing token", { status: 401 });
    }

    try {
      // Use the hardcoded secret for now
      const authSecret = AUTH_SECRET;

      // --- Start Temporary Debug Logging ---
      console.log(
        `[AUTH DEBUG] Using secret: ${authSecret.substring(0, 10)}...`
      );
      console.log(
        `[AUTH DEBUG] Validating token starting with: ${token.substring(
          0,
          10
        )}...`
      );
      // --- End Temporary Debug Logging ---

      const decoded = jwt.verify(token, authSecret) as {
        siteId: string;
        collectionId: string;
        iat: number;
        exp: number;
      };
      // Attach the decoded payload to the context for use in API routes
      context.locals.authToken = decoded;
      console.log(
        `[MIDDLEWARE] JWT verification successful for: ${context.url.pathname}`
      );
    } catch (error) {
      console.error("[AUTH DEBUG] JWT verification failed:", error);
      // This will catch invalid or expired tokens
      return new Response("Unauthorized: Invalid token", { status: 401 });
    }
  }

  const response = await next();
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
});
