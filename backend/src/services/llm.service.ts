import OpenAI from "openai";
import { env } from "../config/env.js";
import { createAppError } from "../errors/app-error.js";
import { SPUR_PROMPT } from "../data/spur.faq.js";

const MODEL = "xiaomi/mimo-v2-flash:free";
const MAX_TOKENS = 200;

export type LlmMessage = {
  role: "user" | "assistant";
  content: string;
};

class LlmService {
  private client = new OpenAI({
    apiKey: env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
  });

  async generateReply(
    history: LlmMessage[],
    userMessage: string
  ): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        model: MODEL,
        temperature: 0.2,
        max_tokens: MAX_TOKENS,
        messages: [
          {
            role: "system",
            content:
              SPUR_PROMPT,
          },
          ...history,
          {
            role: "user",
            content: userMessage,
          },
        ],
      });

      const reply = completion.choices[0]?.message?.content;

      if (!reply || reply.trim().length === 0) {
        throw new Error("Empty LLM response");
      }

      return reply.trim();
    } catch (err) {
      console.error("LLM error:", err);

      throw createAppError(
        "LLM_UNAVAILABLE",
        "Our assistant is temporarily unavailable. Please try again shortly."
      );
    }
  }
}

export const llmService = new LlmService();
