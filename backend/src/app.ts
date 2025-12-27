import cors from "cors";
import express from "express";
import { chatRoutes } from "./routes/chat.route.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { chatHistoryRoutes } from "./routes/chat.history.route.js";

export const app = express();

const allowedOrigins = [
  "https://spur-assist-smoky.vercel.app",
  "https://spur-assist-git-main-kraza8644-3032s-projects.vercel.app",
  "https://spur-assist-fn03vy4q9-kraza8644-3032s-projects.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow server-to-server or Postman requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

app.options("*", cors());


app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api/chat", chatHistoryRoutes);

app.use(errorMiddleware);
