const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const videoSchema = require("./videoSchema").videoSchema;

// Schema cho Video

// Schema cho Trainer
const trainerSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  rate: { type: Number, required: true },
  totalReview: { type: Number, required: true },
});

// Schema cho Course
const courseSchema = new Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  trainer: trainerSchema,
  categorie: { type: String, required: true },
  sub_categorie: { type: String, required: true },
  videos: [videoSchema],
});

// Schema cho Certificate
const certificateSchema = new Schema({
  certificate_id: { type: String, required: true },
  course_id: { type: String, required: true },
  issued_date: { type: Date, required: true },
});

// Mongoose models
const Trainer = mongoose.model("Trainer", trainerSchema);
const Course = mongoose.model("Course", courseSchema);

// Exporting models
module.exports = {
  Trainer,
  Course,
};
