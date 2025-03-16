const express = require("express");
const LiveSession = require("../models/liveSession.model");
const router = express.Router();

// Route to create a new live session
router.post("/create", async (req, res) => {
  const {
    id,
    title,
    img,
    description,
    trainer,
    date,
    categorie,
    sub_categorie,
    platform,
  } = req.body;

  try {
    // Create a new live session
    const newLiveSession = new LiveSession({
      id,
      title,
      img,
      description,
      trainer,
      date,
      categorie,
      sub_categorie,
      platform,
    });

    // Save the live session to the database
    await newLiveSession.save();

    res.status(201).json({
      message: "Live session created successfully",
      liveSession: newLiveSession,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to get all live sessions
router.get("/", async (req, res) => {
  try {
    // Retrieve all live sessions from the database
    const liveSessions = await LiveSession.find();

    // If there are no live sessions
    if (liveSessions.length === 0) {
      return res.status(404).json({ message: "No live sessions found" });
    }

    res.status(200).json({ liveSessions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get a specific live session by its ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find a live session by ID
    const liveSession = await LiveSession.findOne({ id });

    if (!liveSession) {
      return res.status(404).json({ message: "Live session not found" });
    }

    res.status(200).json({ liveSession });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
