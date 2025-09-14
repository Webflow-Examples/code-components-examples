import { genericOAuthClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

// Infer the AuthClient type directly from the createAuthClient function
type AuthClient = ReturnType<typeof createAuthClient>;

// Memoization cache to avoid creating multiple clients for the same URL
const clients = new Map<string, AuthClient>();

const mockAuthClient = {
  useSession: () => ({
    data: null,
    isPending: true,
    refetch: () => Promise.resolve(),
  }),
  signIn: {
    oauth2: () => Promise.resolve(),
  },
};

export function getAuthClient(apiBaseUrl?: string): AuthClient {
  if (typeof window === "undefined") {
    // In a Node.js environment (like the Webflow CLI build), we must
    // return a mock object to prevent the build from crashing.
    return mockAuthClient as any;
  }

  if (!apiBaseUrl) {
    // If no URL is provided while in the browser, we cannot make API calls.
    // We return the mock, which will keep the UI in a "pending" state.
    console.warn(
      "apiBaseUrl not provided to getAuthClient in browser. Returning mock."
    );
    return mockAuthClient as any;
  }

  // Check if a client for this URL has already been created.
  if (clients.has(apiBaseUrl)) {
    return clients.get(apiBaseUrl)!;
  }

  // If not, create a new client and cache it for future use.
  const newClient = createAuthClient({
    baseURL: `${apiBaseUrl}/api/auth`,
    plugins: [genericOAuthClient()],
    fetch: (url: string, options: RequestInit) => {
      // Ensure credentials (cookies) are included in every request
      return fetch(url, { ...options, credentials: "include" });
    },
  });

  clients.set(apiBaseUrl, newClient);
  return newClient;
}
