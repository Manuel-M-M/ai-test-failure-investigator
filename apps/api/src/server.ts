import "dotenv/config";
import cors from "cors";
import express from "express";
import investigateRouter from "./routes/investigate.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "ai-test-failure-investigator-api"
  });
});

app.use("/", investigateRouter);

export default app;