import type { APIContext } from "astro";
import jwt from "jsonwebtoken";
import { z } from "zod";

const TileRequestParams = z.object({
  z: z.string(),
  x: z.string(),
  y: z.string(),
});

const DecodedToken = z.object({
  mapboxToken: z.string(),
});

/**
 * GET /api/maps/tiles/[z]/[x]/[y].png
 * This endpoint proxies tile requests to the Mapbox Static Tiles API,
 * using a JWT to securely pass the Mapbox access token.
 */
export const GET = async (context: APIContext) => {
  const { params, request } = context;
  const { searchParams } = new URL(request.url);

  const token = searchParams.get("token");
  const style = searchParams.get("style") || "streets-v12";

  if (!token) {
    return new Response("Missing token", { status: 400 });
  }

  try {
    const tileParams = TileRequestParams.parse(params);
    const { z, x, y } = tileParams;

    // The JWT secret should be stored securely as an environment variable
    const jwtSecret = context.locals.runtime.env.BETTER_AUTH_SECRET;
    if (!jwtSecret) {
      throw new Error(
        "BETTER_AUTH_SECRET is not set in environment variables."
      );
    }

    const decoded = DecodedToken.parse(jwt.verify(token, jwtSecret));
    const mapboxToken = decoded.mapboxToken;

    const mapboxUrl = `https://api.mapbox.com/styles/v1/mapbox/${style}/tiles/${z}/${x}/${y}?access_token=${mapboxToken}`;

    const response = await fetch(mapboxUrl);

    if (!response.ok) {
      return new Response("Failed to fetch tile from Mapbox", {
        status: response.status,
      });
    }

    const image = await response.arrayBuffer();

    return new Response(image, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400", // Cache for 1 day
      },
    });
  } catch (error) {
    console.error("Error processing tile request:", error);
    if (error instanceof z.ZodError) {
      return new Response("Invalid request parameters", { status: 400 });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return new Response("Invalid token", { status: 401 });
    }
    return new Response("Internal server error", { status: 500 });
  }
};
