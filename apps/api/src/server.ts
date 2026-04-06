import "dotenv/config";
import cors from "cors";
import express from "express";
import investigateRouter from "./routes/investigate.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-test-failure-investigator-web.vercel.app"
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.options("*", cors());

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "ai-test-failure-investigator-api"
  });
});

app.use("/", investigateRouter);

export default app;