import { Router } from "express";
import { z } from "zod";
import { investigateFailure } from "../services/openai.js";

const router = Router();

const investigationSchema = z.object({
  errorLog: z.string().min(1, "errorLog is required"),
  context: z.string().optional(),
  framework: z.enum(["vitest", "jest", "playwright", "cypress", "generic"])
});

router.post("/investigate", async (req, res) => {
  const parsed = investigationSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid request body",
      details: parsed.error.flatten()
    });
  }

  try {
    const result = await investigateFailure(parsed.data);
    return res.json(result);
  } catch (error) {
    console.error("Investigation failed:", error);

    return res.status(500).json({
      error: "Failed to investigate test failure"
    });
  }
});

export default router;