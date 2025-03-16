const express = require("express");
const Categorie = require("../models/categorie.model");
const router = express.Router();

// Route to create a new category
router.post("/create", async (req, res) => {
  const { id, label, img } = req.body;

  try {
    // Create a new category
    const newCategory = new Categorie({ id, label, img });

    // Save the category to the database
    await newCategory.save();

    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to get all categories
router.get("/", async (req, res) => {
  try {
    // Retrieve all categories from the database
    const categories = await Categorie.find();

    // If there are no categories
    if (categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    res.status(200).json({ categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
