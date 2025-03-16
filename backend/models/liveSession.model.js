const mongoose = require("mongoose");
const { Schema } = mongoose;

const liveSessionSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  img: { type: String, required: true },
  description: { type: String, required: true },
  trainer: {
    name: { type: String, required: true },
    rate: { type: Number, required: true },
    totalReview: { type: Number, required: true },
  },
  date: { type: String, required: true },
  categorie: { type: String, required: true },
  sub_categorie: { type: String, required: true },
  platform: { type: String, required: true },
});

const LiveSession = mongoose.model("LiveSession", liveSessionSchema);
module.exports = LiveSession;
