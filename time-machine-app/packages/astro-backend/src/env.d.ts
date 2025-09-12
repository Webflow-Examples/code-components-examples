/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

type ENV = {
  WEBFLOW_CLIENT_ID: string;
  WEBFLOW_CLIENT_SECRET: string;
};

declare namespace App {
  interface Locals {
    runtime: {
      env: ENV & {
        DB: D1Database;
        CACHE: KVNamespace;
      };
    };
  }
}
