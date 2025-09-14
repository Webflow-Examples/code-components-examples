import type { APIContext } from "astro";
import { betterAuth, type Account, type User } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { genericOAuth } from "better-auth/plugins";
import { createDb } from "./db";
import * as authSchema from "./db/schema";
import { eq } from "drizzle-orm";

interface WebflowIntrospection {
  authorization: {
    authorizedTo: {
      siteIds: string[];
    };
  };
}

export function createAuth(locals: APIContext["locals"]) {
  const { env } = locals.runtime;
  return betterAuth({
    baseURL: `${env.PUBLIC_BETTER_AUTH_URL}`,
    secret: env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(createDb(env.DB), {
      schema: authSchema,
      provider: "sqlite",
    }),
    events: {
      signIn: async ({
        user,
        account,
        isNewUser,
      }: {
        user: User;
        account: Account;
        isNewUser: boolean;
      }) => {
        if (!isNewUser) {
          const db = createDb(env.DB);
          await db
            .update(authSchema.account)
            .set({
              accessToken: account.accessToken,
              refreshToken: account.refreshToken,
              accessTokenExpiresAt: account.accessTokenExpiresAt,
              refreshTokenExpiresAt: account.refreshTokenExpiresAt,
            })
            .where(eq(authSchema.account.accountId, account.accountId));
        }
      },
    },
    plugins: [
      genericOAuth({
        config: [
          {
            providerId: "webflow",
            clientId: env.WEBFLOW_CLIENT_ID,
            clientSecret: env.WEBFLOW_CLIENT_SECRET,
            authorizationUrl: "https://webflow.com/oauth/authorize",
            tokenUrl: "https://api.webflow.com/oauth/access_token",
            userInfoUrl: "https://api.webflow.com/v2/token/authorized_by",
            redirectURI: `${
              env.PUBLIC_BETTER_AUTH_URL + import.meta.env.BASE_URL
            }/api/auth/oauth2/callback/webflow`,
            scopes: ["sites:read", "cms:read", "authorized_user:read"],
            mapProfileToUser: (profile: any) => ({
              id: profile.id,
              name: `${profile.firstName} ${profile.lastName}`,
              email: profile.email,
            }),
          },
        ],
      }),
    ],
  });
}
