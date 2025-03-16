const mongoose = require("mongoose");
const { Schema } = mongoose;

const videoSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: String, required: true },
  url: { type: String, required: true },
});

const trainerSchema = new Schema({
  img: { type: String, required: true },
  name: { type: String, required: true },
  rate: { type: Number, required: true },
  totalReview: { type: Number, required: true },
});

const trainingSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  img: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  trainer: { type: trainerSchema, required: true },
  categorie: { type: String, required: true },
  sub_categorie: { type: String, required: true },
  videos: [videoSchema],
});

const Training = mongoose.model("Training", trainingSchema);
module.exports = Training;
