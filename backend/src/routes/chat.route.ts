import { Router } from "express";
import { ChatMessageSchema } from "../validators/chat.schema.js";
import { chatController } from "../controllers/chat.controller.js";
import { chatRateLimiter } from "../middleware/rate-limit.middleware.js";

const router = Router();

router.post(
  "/message",
  chatRateLimiter, 
  async (req, res, next) => {
    try {
      const parsed = ChatMessageSchema.parse(req.body);
      const result = await chatController.handle(parsed);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

export { router as chatRoutes };
