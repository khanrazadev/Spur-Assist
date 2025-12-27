import { SPUR_FAQ } from "../data/spur.faq.js";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // remove all punctuation
    .replace(/\s+/g, " ")    // collapse multiple spaces
    .trim();
}

class FaqService {
  findAnswer(message: string): string | null {
    const normalizedMessage = normalize(message);

    for (const faq of SPUR_FAQ) {
      for (const trigger of faq.triggers) {
        const normalizedTrigger = normalize(trigger);

        if (normalizedMessage.includes(normalizedTrigger)) {
          return faq.answer;
        }
      }
    }

    return null;
  }
}

export const faqService = new FaqService();
