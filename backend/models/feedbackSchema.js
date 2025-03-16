const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const feedbackSchema = new Schema({
  review: { type: Number, required: true },
  feedback: { type: String, required: true },
  profile: {
    name: { type: String, required: true },
    img: { type: String, required: true },
  },
});

// Mongoose models
const Feedback = mongoose.model("Feedback", feedbackSchema);

// Exporting models
module.exports = {
  Feedback,
};
