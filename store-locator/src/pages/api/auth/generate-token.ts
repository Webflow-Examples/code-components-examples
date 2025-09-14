import type { APIRoute } from "astro";
import jwt from "jsonwebtoken";

// This would normally come from environment variables
const AUTH_SECRET = import.meta.env.BETTER_AUTH_SECRET || "a-secure-secret-key";

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { siteId, collectionId } = (await request.json()) as {
      siteId: string;
      collectionId: string;
    };

    if (!siteId || !collectionId) {
      return new Response("siteId and collectionId are required", {
        status: 400,
      });
    }

    // Get the auth secret from environment variables
    const authSecret = locals.runtime.env.BETTER_AUTH_SECRET || AUTH_SECRET;

    console.log(
      `[TOKEN DEBUG] Using secret: ${authSecret.substring(0, 10)}...`
    );

    // The token contains the necessary info and expires in 1 year
    const token = jwt.sign({ siteId, collectionId }, authSecret, {
      expiresIn: "1y",
    });

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Token generation error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
