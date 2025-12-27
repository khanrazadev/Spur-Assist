import { faqService } from "./faq.service.js";
import { llmService, type LlmMessage } from "./llm.service.js";
import {
  createConversation,
  conversationExists,
} from "../repositories/conversation.repo.js";
import {
  saveMessage,
  getRecentMessages,
} from "../repositories/message.repo.js";
import { runTransaction } from "../db/transaction.js";

const HISTORY_LIMIT = 6;

class ChatService {
  async handleMessage(
    message: string,
    sessionId?: string
  ): Promise<{ reply: string; sessionId: string }> {
    let conversationId = sessionId;

    if (!conversationId || !conversationExists(conversationId)) {
      conversationId = createConversation();
    }

    // save user message
    saveMessage(conversationId, "user", message);

    // FAQ  (atomic)
    const faqAnswer = faqService.findAnswer(message);
    if (faqAnswer) {
      runTransaction(() => {
        saveMessage(conversationId!, "ai", faqAnswer);
      });

      return {
        sessionId: conversationId,
        reply: faqAnswer,
      };
    }

    // Fetch history
    const history = getRecentMessages(
      conversationId,
      HISTORY_LIMIT
    ).map<LlmMessage>((m) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text,
    }));

    // Call LLM 
    const reply = await llmService.generateReply(history, message);

    // persisting reply
    runTransaction(() => {
      saveMessage(conversationId!, "ai", reply);
    });

    return {
      sessionId: conversationId,
      reply,
    };
  }
}

export const chatService = new ChatService();
