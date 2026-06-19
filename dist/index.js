// server/index.ts
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
async function startServer() {
  const app = express();
  const server = createServer(app);
  const staticPath = process.env.NODE_ENV === "production" ? path.resolve(__dirname, "public") : path.resolve(__dirname, "..", "dist", "public");
  app.use(express.json({ limit: "50mb" }));
  app.use(express.static(staticPath));
  const HITPAW_API_KEY = "jtDMsZo5K6xviU8Ll4PG";
  const HITPAW_BASE_URL = "https://api-base.hitpaw.com";
  app.post("/api/proxy/photo-enhancer", async (req, res) => {
    console.log("Received photo-enhancer request:", { ...req.body, img_url: req.body.img_url?.substring(0, 50) + "..." });
    try {
      const response = await axios.post(`${HITPAW_BASE_URL}/api/photo-enhancer`, req.body, {
        headers: { "Apikey": HITPAW_API_KEY, "Content-Type": "application/json" }
      });
      console.log("HitPaw photo-enhancer response:", response.data);
      res.json(response.data);
    } catch (error) {
      console.error("HitPaw photo-enhancer error:", error.response?.data || error.message);
      res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
  });
  app.post("/api/proxy/video-enhancer", async (req, res) => {
    console.log("Received video-enhancer request:", { ...req.body, video_url: req.body.video_url?.substring(0, 50) + "..." });
    try {
      const response = await axios.post(`${HITPAW_BASE_URL}/api/video-enhancer`, req.body, {
        headers: { "Apikey": HITPAW_API_KEY, "Content-Type": "application/json" }
      });
      console.log("HitPaw video-enhancer response:", response.data);
      res.json(response.data);
    } catch (error) {
      console.error("HitPaw video-enhancer error:", error.response?.data || error.message);
      res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
  });
  app.post("/api/proxy/task-status", async (req, res) => {
    try {
      const response = await axios.post(`${HITPAW_BASE_URL}/api/task-status`, req.body, {
        headers: { "Apikey": HITPAW_API_KEY, "Content-Type": "application/json" }
      });
      res.json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
  });
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
  const port = process.env.PORT || 3e3;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
startServer().catch(console.error);
