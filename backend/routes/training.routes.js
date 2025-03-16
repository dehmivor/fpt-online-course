const express = require("express");
const Training = require("../models/training.model");
const router = express.Router();

// Route to create a new training session
router.post("/create", async (req, res) => {
  const {
    title,
    img,
    description,
    date,
    trainer,
    categorie,
    sub_categorie,
    videos,
  } = req.body;

  try {
    // Lấy số lượng phần tử hiện có để xác định id mới
    const count = await Training.countDocuments();
    const newId = count + 1;

    // Tạo một session training mới
    const newTraining = new Training({
      id: newId,
      title,
      img,
      description,
      date,
      trainer,
      categorie,
      sub_categorie,
      videos,
    });

    // Lưu vào database
    await newTraining.save();

    res.status(201).json({
      message: "Training session created successfully",
      training: newTraining,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to get all training sessions
router.get("/", async (req, res) => {
  try {
    // Retrieve all training sessions from the database
    const trainings = await Training.find();

    // If there are no training sessions
    if (trainings.length === 0) {
      return res.status(404).json({ message: "No training sessions found" });
    }

    res.status(200).json({ trainings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get a specific training session by its ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find a training session by ID
    const training = await Training.findOne({ id });

    if (!training) {
      return res.status(404).json({ message: "Training session not found" });
    }

    res.status(200).json({ training });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Find a training session by ID and update it
    const training = await Training.findOneAndUpdate({ id }, updates, {
      new: true,
    });

    if (!training) {
      return res.status(404).json({ message: "Training session not found" });
    }

    res.status(200).json({ training });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
