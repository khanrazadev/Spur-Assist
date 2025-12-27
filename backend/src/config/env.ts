export const env = {
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
};

if (!env.OPENROUTER_API_KEY) {
    throw new Error("Missing required env var: OPENAI_API_KEY");
}
