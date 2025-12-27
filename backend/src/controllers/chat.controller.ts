import type { ChatMessageInput } from "../validators/chat.schema.js";
import { chatService } from "../services/chat.service.js";

class ChatController {
  async handle(input: ChatMessageInput): Promise<{
    sessionId: string;
    reply: string;
  }> {
    return chatService.handleMessage(
      input.message,
      input.sessionId
    );
  }
}

export const chatController = new ChatController();
