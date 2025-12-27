import cors from "cors";
import express from "express";
import { chatRoutes } from "./routes/chat.route.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { chatHistoryRoutes } from "./routes/chat.history.route.js";

export const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman / server-to-server
      if (!origin) return callback(null, true);

      if (origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api/chat", chatHistoryRoutes);

app.use(errorMiddleware);
