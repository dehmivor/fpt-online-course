const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  documentIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
  slots: [{ type: mongoose.Schema.Types.ObjectId, ref: "Slot" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", CourseSchema);
