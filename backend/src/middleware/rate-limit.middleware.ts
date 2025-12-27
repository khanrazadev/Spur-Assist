import rateLimit from "express-rate-limit";
import type { Request } from "express";

export const chatRateLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 20, 

  standardHeaders: true,
  legacyHeaders: false,

  keyGenerator: (req: Request): string => {
    // Prefer real IP if behind proxy, fallback safely
    return (
      req.headers["x-forwarded-for"]?.toString() ??
      req.socket.remoteAddress ??
      "unknown"
    );
  },

  handler: (_req, res) => {
    res.status(429).json({
      error: {
        code: "RATE_LIMITED",
        message:
          "You’re sending messages too quickly. Please wait a moment and try again.",
      },
    });
  },
});
