import { Router } from "express";
import { investigateFailure } from "../services/openai.js";

const router = Router();

router.post("/investigate", async (req, res) => {
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