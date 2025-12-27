import { db } from "./client.js";

export function runTransaction<T>(fn: () => T): T {
  const txn = db.transaction(fn);
  return txn();
}
