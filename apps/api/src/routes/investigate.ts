import { Router } from "express";
import { investigateFailure } from "../services/openai.js";

const router = Router();

router.options("/investigate", (_req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  return res.status(200).end();
});

router.post("/investigate", async (req, res) => {
  // 🔥 CORS headers SIEMPRE (también en POST)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    const { errorLog, context, framework } = req.body;

    if (!errorLog || typeof errorLog !== "string") {
      return res.status(400).json({
        error: "errorLog is required and must be a string"
      });
    }

    const result = await investigateFailure({
      errorLog,
      context,
      framework
    });

    return res.json(result);

  } catch (error) {
    console.error("Investigation failed:", error);

    return res.status(500).json({
      error: "Failed to investigate test failure"
    });
  }
});

export default router;