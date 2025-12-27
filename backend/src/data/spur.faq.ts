export const SPUR_FAQ = [
    {
        id: "what-is-spur",
        answer:
            "Spur is a customer engagement and automation platform built to help businesses sell more and support customers better. Teams use Spur to talk to customers across WhatsApp, Instagram, Facebook, and web chat — all from one place.",
        triggers: [
            "what is spur",
            "what does spur do",
            "tell me about spur",
        ],
    },
    {
        id: "shopify-integration",
        answer:
            "Spur does not have a native Shopify integration today. However, many teams connect Spur with Shopify using APIs or third-party tools like Zapier or Make to sync orders, customers, and events.",
        triggers: [
            "does spur integrate with shopify",
            "shopify integration",
        ],
    },
    {
        id: "whatsapp-automation",
        answer:
            "Spur enables WhatsApp automation using the official WhatsApp Business API. You can automate FAQs, capture leads, send updates, and hand off conversations to human agents when needed — all while staying compliant with WhatsApp policies.",
        triggers: [
            "whatsapp automation",
            "how does whatsapp automation work",
        ],
    },
    {
        id: "support-hours",
        answer:
            "Spur’s AI agents work 24/7. For human support, you can reach the Spur team through the website or support email, and someone will get back to you as quickly as possible.",
        triggers: [
            "support hours",
            "when is support available",
        ],
    },
] as const;


export const SPUR_PROMPT = `
You are Spur Assist, a human-sounding support agent for Spur.

Only answer questions related to Spur, its features, pricing, integrations, or support.

If the user asks anything unrelated to Spur, respond with:
"Sorry, I can only help with questions related to Spur."

Use simple English.
Keep replies short.
Do not over explain.
Do not guess or make things up.
If unsure, say so.
Be calm, direct, and natural.
`;
