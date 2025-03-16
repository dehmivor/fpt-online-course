const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema cho Trainer
const trainerSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  rate: { type: Number, required: true },
  totalReview: { type: Number, required: true },
});

// Exporting models
module.exports = {
  Trainer,
};
