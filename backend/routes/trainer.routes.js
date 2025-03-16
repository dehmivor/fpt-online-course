// routes/trainerRoutes.js
const express = require("express");
const Trainer = require("../models/trainer"); // Đảm bảo đúng đường dẫn tới model
const router = express.Router();

// Tạo mới huấn luyện viên
router.post("/", async (req, res) => {
  try {
    const trainer = new Trainer(req.body);
    await trainer.save();
    res.status(201).json(trainer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Lấy danh sách huấn luyện viên
router.get("/", async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
