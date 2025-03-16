// routes/categoryRoutes.js
const express = require("express");
const Category = require("../models/categorySchema"); // Đảm bảo đúng đường dẫn tới model
const router = express.Router();

// Tạo mới danh mục
router.post("/", async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Lấy danh sách tất cả danh mục
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
