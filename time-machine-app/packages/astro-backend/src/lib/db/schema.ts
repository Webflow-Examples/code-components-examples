import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const sites = sqliteTable("sites", {
  siteId: text("site_id").primaryKey(),
  webflowAccessToken: text("webflow_access_token").notNull(),
  mapboxKey: text("mapbox_key"),
});
