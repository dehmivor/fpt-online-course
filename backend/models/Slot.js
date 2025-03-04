const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
  courseID: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  content: String,
  homework: String,
  note: String,
  video: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Slot", SlotSchema);
