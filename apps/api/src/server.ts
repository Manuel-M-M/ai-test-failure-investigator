import "dotenv/config";
import cors from "cors";
import express from "express";
import investigateRouter from "./routes/investigate.js";

const app = express();

const corsOptions: cors.CorsOptions = {
  origin: [
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "ai-test-failure-investigator-api"
  });
});

app.use("/", investigateRouter);

export default app;