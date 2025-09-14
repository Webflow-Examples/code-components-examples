import { WebflowClient } from "webflow-api";

/**
 * Creates a new Webflow API client initialized with a user-specific access token.
 * @param {string} token - The user's Webflow access token.
 * @returns A new WebflowClient instance.
 */
export function createClient(token: string) {
  return new WebflowClient({
    accessToken: token,
  });
}
