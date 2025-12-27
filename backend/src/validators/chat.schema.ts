import { z } from "zod";

export const ChatMessageSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, "Message cannot be empty")
    .max(500, "Message is too long"),

  sessionId: z.string().uuid().optional(),
});

export type ChatMessageInput = z.infer<typeof ChatMessageSchema>;
