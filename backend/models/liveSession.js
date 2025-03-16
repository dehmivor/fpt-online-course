const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema cho Live Session
const liveSessionSchema = new Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
  description: { type: String, required: true },
});

// Mongoose models
const LiveSession = mongoose.model("LiveSession", liveSessionSchema);

// Exporting models
module.exports = {
  LiveSession,
};
