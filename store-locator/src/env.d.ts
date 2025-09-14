/* eslint-disable @typescript-eslint/no-empty-interface */
type Runtime = import("@astrojs/cloudflare").Runtime<Env>;
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_BETTER_AUTH_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type ENV = {
  WEBFLOW_CLIENT_ID: string;
  WEBFLOW_CLIENT_SECRET: string;
  BETTER_AUTH_SECRET: string;
  BASE_URL: string;
};

declare namespace App {
  interface Locals {
    runtime: {
      env: {
        DB: D1Database;
        CACHE: KVNamespace;
        WEBFLOW_CLIENT_ID: string;
        WEBFLOW_CLIENT_SECRET: string;
        BETTER_AUTH_SECRET: string;
        BASE_URL: string;
        PUBLIC_BETTER_AUTH_URL: string;
      };
    };
    authToken?: {
      siteId: string;
      collectionId: string;
      iat: number;
      exp: number;
    };
  }
}
