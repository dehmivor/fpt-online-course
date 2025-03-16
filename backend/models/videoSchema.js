const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema cho Video
const videoSchema = new Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  url: { type: String, required: true },
});

// Mongoose models
const Video = mongoose.model("Video", videoSchema);
module.exports = {
  Video,
};
