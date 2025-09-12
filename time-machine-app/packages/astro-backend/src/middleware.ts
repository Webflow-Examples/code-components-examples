import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // Allow requests from any origin
  response.headers.set("Access-Control-Allow-Origin", "*");

  // Handle preflight requests
  if (context.request.method === "OPTIONS") {
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return new Response(null, {
      status: 204,
      headers: response.headers,
    });
  }

  return response;
});
