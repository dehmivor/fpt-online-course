// routes/feedbackRoutes.js
const express = require("express");
const Feedback = require("../models/feedbackSchema"); // Đảm bảo đúng đường dẫn tới model
const router = express.Router();

// Tạo mới phản hồi
router.post("/", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Lấy danh sách tất cả phản hồi
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
