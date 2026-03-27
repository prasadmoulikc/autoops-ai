import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for n8n execution
  app.post("/api/execute", async (req, res) => {
    const { input, userId } = req.body;
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!n8nWebhookUrl) {
      // Fallback/Simulation if n8n is not configured yet
      console.warn("N8N_WEBHOOK_URL not found. Simulating response...");
      
      // Simulate n8n delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      const simulatedResponse = {
        plan: [
          "Analyze income data for current financial year",
          "Calculate GST liability at 18% slab",
          "Generate compliance report and filing draft"
        ],
        execution: [
          { step: "Income Processed", status: "success", detail: "₹10,00,000 identified" },
          { step: "GST Calculated", status: "success", detail: "₹1,80,000 liability" },
          { step: "Filing Prepared", status: "success", detail: "Ready for submission" }
        ],
        result: "GST filing ready. Total Amount: ₹1,80,000. Refund expected: ₹12,300.",
        confidence: 0.94,
        optimization: "32%"
      };

      return res.json(simulatedResponse);
    }

    try {
      const response = await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, userId }),
      });

      if (!response.ok) {
        throw new Error(`n8n responded with ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("n8n Integration Error:", error);
      res.status(500).json({ error: "Failed to communicate with AI Agent" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AutoOps AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
