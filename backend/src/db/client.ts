import Database from "better-sqlite3";

export const db: Database.Database = new Database("spur.db");

// Enforcing key
db.pragma("foreign_keys = ON");
