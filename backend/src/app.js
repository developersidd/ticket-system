import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import authRouter from "./routes/auth.route.js";
import ticketRouter from "./routes/ticket.route.js";
import userRouter from "./routes/user.route.js";
import ApiError from "./utils/ApiError.js";

const app = express();
// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ limit: "20kb" }));
app.use(express.json({ limit: "20kb" }));
app.use(express.static("public"));

app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));


// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Ticket System API");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tickets", ticketRouter);
// 404 Error Handler
app.use((req, _, next) => {
  const error = new ApiError(404, "Page Not Found");
  next(error);
});

// Global Error Handler
app.use((err, _, res) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  return res.status(statusCode).json({
    ...err,
    message,
  });
});

export default app;
