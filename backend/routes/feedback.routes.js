const express = require("express");
const Feedback = require("../models/feedback.model");
const router = express.Router();

// Route to create a new feedback
router.post("/create", async (req, res) => {
  const { id, review, feedback, profile } = req.body;

  try {
    // Create a new feedback document
    const newFeedback = new Feedback({
      id,
      review,
      feedback,
      profile,
    });

    // Save the feedback to the database
    await newFeedback.save();

    res.status(201).json({
      message: "Feedback created successfully",
      feedback: newFeedback,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to get all feedbacks
router.get("/", async (req, res) => {
  try {
    // Retrieve all feedbacks from the database
    const feedbacks = await Feedback.find();

    // If there are no feedbacks
    if (feedbacks.length === 0) {
      return res.status(404).json({ message: "No feedbacks found" });
    }

    res.status(200).json({ feedbacks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get a specific feedback by its ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find a feedback by ID
    const feedback = await Feedback.findOne({ id });

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ feedback });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
