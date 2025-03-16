const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema cho Video
const videoSchema = new Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  url: { type: String, required: true },
});

// Mongoose models
const Trainer = mongoose.model("Trainer", trainerSchema);
const Video = mongoose.model("Video", videoSchema);
const Course = mongoose.model("Course", courseSchema);
const Feedback = mongoose.model("Feedback", feedbackSchema);
const User = mongoose.model("User", userSchema);
const Category = mongoose.model("Category", categorySchema);
const LiveSession = mongoose.model("LiveSession", liveSessionSchema);

// Exporting models
module.exports = {
  Video,
};
