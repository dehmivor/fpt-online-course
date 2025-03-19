const express = require("express");
const Feedback = require("../models/feedback.model");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/create", async (req, res) => {
  const { id, review, feedback, profile } = req.body;

  try {
    // Đảm bảo review là số
    const numericReview = Number(review);

    // Tạo document mới cho feedback
    const newFeedback = new Feedback({
      id,
      review: numericReview,
      feedback,
      profile,
      status: "deactive",
    });

    // Lưu vào database
    await newFeedback.save();

    // Tạo đối tượng phản hồi thủ công với tất cả các trường
    const currentTime = new Date();
    const savedFeedback = {
      _id: newFeedback._id,
      id: newFeedback.id,
      review: newFeedback.review,
      feedback: newFeedback.feedback,
      profile: newFeedback.profile,
      status: newFeedback.status || "deactive",
      createdAt: newFeedback.createdAt || currentTime,
      updatedAt: newFeedback.updatedAt || currentTime,
    };

    res.status(201).json({
      message: "Feedback created successfully",
      feedback: savedFeedback,
    });
  } catch (err) {
    console.error("Create feedback error:", err);
    res.status(400).json({ error: err.message });
  }
});
// Route to get all feedbacks
router.get("/", async (req, res) => {
  try {
    // Retrieve all feedbacks and include createdAt field
    const feedbacks = await Feedback.find({}, "content createdAt");

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

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  const { review, feedback, profile, status } = req.body;

  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { review, feedback, profile, status },
      { new: true }
    );

    if (!updatedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({
      message: "Feedback updated successfully",
      feedback: updatedFeedback,
    });
  } catch (err) {
    console.error("Update feedback error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
