const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  id: { type: Number, required: true },
  review: { type: Number, required: true },
  feedback: { type: String, required: true },
  profile: {
    name: { type: String, required: true },
    img: { type: String, required: true },
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
