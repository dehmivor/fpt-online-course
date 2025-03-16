// routes/liveSessionRoutes.js
const express = require("express");
const LiveSession = require("../models/liveSession"); // Đảm bảo đúng đường dẫn tới model
const router = express.Router();

// Tạo mới buổi học trực tuyến
router.post("/", async (req, res) => {
  try {
    const liveSession = new LiveSession(req.body);
    await liveSession.save();
    res.status(201).json(liveSession);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Lấy danh sách tất cả buổi học trực tuyến
router.get("/", async (req, res) => {
  try {
    const liveSessions = await LiveSession.find();
    res.json(liveSessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
