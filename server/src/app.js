import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

// 1. Security headers
app.use(helmet());

// 2. CORS CONFIG
app.use(
  cors({
    origin: process.env.CLIENT_URL, // frontend URL
    credentials: true, // allow cookies
  }),
);

// 3. Logging (only in development)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// 4. Rate limiting (prevent brute force)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // max requests per IP
  message: "Too many requests, try again later",
});

app.use(limiter);

// 5. Body & cookies
app.use(express.json());
app.use(cookieParser());

// 6. Routes
app.use("/api/auth", authRoutes);

// 7. Error handler (ALWAYS LAST)
app.use(errorHandler);

export default app;
