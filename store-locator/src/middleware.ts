import { defineMiddleware } from "astro:middleware";
import jwt from "jsonwebtoken";

/**
 * Global middleware
 * - Adds permissive CORS for local dev and Webflow domains
 * - Validates JWT for protected API routes and attaches decoded payload to locals
 */
export const onRequest = defineMiddleware(async (context, next) => {
  const AUTH_SECRET = context.locals.runtime.env.BETTER_AUTH_SECRET;
  const origin = context.request.headers.get("Origin");

  // Allow Webflow domains and localhost for development
  const allowedOrigins = [
    "http://localhost:4321",
    "http://localhost:3000",
    "https://webflow.com",
    "https://*.webflow.com",
    "https://*.design.webflow.com",
    "https://*.webflow.io",
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
  // Note: When deployed under a base path (e.g. /map), API routes include it.
  const protectedRoutes = /^\/map\/api\/(locations|geocode|maps)/;

  if (protectedRoutes.test(context.url.pathname)) {
    const authHeader = context.request.headers.get("Authorization");
    let token = authHeader?.split(" ")[1];

    // For map tile requests, token may be in the query string
    if (!token && context.url.pathname.includes("/api/maps/tiles")) {
      token = context.url.searchParams.get("token") || undefined;
    }

    if (!token) {
      return new Response("Unauthorized: Missing token", { status: 401 });
    }

    try {
      const authSecret = AUTH_SECRET;

      const decoded = jwt.verify(token, authSecret) as {
        siteId: string;
        collectionId: string;
        iat: number;
        exp: number;
      };
      // Attach the decoded payload to the context for use in API routes
      context.locals.authToken = decoded;
    } catch (error) {
      console.error("JWT verification failed:", error);
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
