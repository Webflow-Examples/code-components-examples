import { createAuth } from "../../../lib/auth";
import type { APIContext } from "astro";

export const ALL = (context: APIContext) => {
  return createAuth(context.locals).handler(context.request);
};
