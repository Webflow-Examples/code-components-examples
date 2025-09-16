import { WebflowClient } from "webflow-api";

/**
 * Returns a Webflow API client initialized with a user/site access token.
 * This client is used server-side to fetch Sites, Collections and Items.
 */
export function createClient(token: string) {
  return new WebflowClient({ accessToken: token });
}
