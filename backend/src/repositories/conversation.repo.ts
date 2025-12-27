import { db } from "../db/client.js";
import crypto from "crypto";

export function createConversation(): string {
  const id = crypto.randomUUID();

  db.prepare(
    `INSERT INTO conversations (id, created_at)
     VALUES (?, ?)`
  ).run(id, new Date().toISOString());

  return id;
}

export function conversationExists(id: string): boolean {
  const row = db
    .prepare(`SELECT id FROM conversations WHERE id = ?`)
    .get(id);

  return Boolean(row);
}
