import { Router } from "express";
import { getRecentMessages } from "../repositories/message.repo.js";

const router = Router();

router.get("/history", (req, res) => {
  const sessionId = req.query.sessionId;

  if (typeof sessionId !== "string") {
    return res.status(400).json({
      error: {
        code: "INVALID_INPUT",
        message: "sessionId is required",
      },
    });
  }

  const messages = getRecentMessages(sessionId, 50);

  res.json({
    messages,
  });
});

export { router as chatHistoryRoutes };
