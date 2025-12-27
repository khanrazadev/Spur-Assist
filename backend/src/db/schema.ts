import { db } from "./client.js";

export function createSchema(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS conversations (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      conversation_id TEXT NOT NULL,
      sender TEXT CHECK(sender IN ('user', 'ai')) NOT NULL,
      text TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY(conversation_id) REFERENCES conversations(id)
        ON DELETE CASCADE
    );
  `);
}
