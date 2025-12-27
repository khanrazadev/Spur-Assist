import { db } from "../db/client.js";
import crypto from "crypto";

export type Sender = "user" | "ai";

export function saveMessage(
  conversationId: string,
  sender: Sender,
  text: string
): void {
  db.prepare(
    `INSERT INTO messages
      (id, conversation_id, sender, text, created_at)
     VALUES (?, ?, ?, ?, ?)`
  ).run(
    crypto.randomUUID(),
    conversationId,
    sender,
    text,
    new Date().toISOString()
  );
}

export function getRecentMessages(
  conversationId: string,
  limit: number
): Array<{ sender: Sender; text: string }> {
  return (db
    .prepare(
      `SELECT sender, text
       FROM messages
       WHERE conversation_id = ?
       ORDER BY created_at DESC
       LIMIT ?`
    )
    .all(conversationId, limit) as Array<{ sender: Sender; text: string }>)
    .reverse();
}
