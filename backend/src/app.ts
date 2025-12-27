import cors from "cors";
import express from "express";
import { chatRoutes } from "./routes/chat.route.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { chatHistoryRoutes } from "./routes/chat.history.route.js";

export const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://spur-assist-smoky.vercel.app/"
    ],
  })
);
app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api/chat", chatHistoryRoutes);

app.use(errorMiddleware);
