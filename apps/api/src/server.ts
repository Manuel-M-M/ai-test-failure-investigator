import cors from "cors";
import express from "express";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "ai-test-failure-investigator-api"
  });
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});