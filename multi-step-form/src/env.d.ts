/// <reference path="../.astro/types.d.ts" />
/* eslint-disable @typescript-eslint/no-empty-interface */
type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}
