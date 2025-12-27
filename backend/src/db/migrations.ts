import { createSchema } from "./schema.js";

export function runMigrations(): void {
  createSchema();
  console.log("Database schema ensured");
}
