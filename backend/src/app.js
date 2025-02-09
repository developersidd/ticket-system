import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(express.json({ limit: "20kb" }));
app.use(express.static("public"));
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

// 404 Error Handler
app.use((req, res, next) => {
    const error = new ApiError(404, "Page Not Found");
    next(error);
  });
  
  // Global Error Handler
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
  
    return res.status(statusCode).json({
      ...err,
      message,
    });
  });
  
  export default app;
  