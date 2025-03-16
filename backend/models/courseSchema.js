const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

// Schema cho Feedback
const feedbackSchema = new Schema({
  review: { type: Number, required: true },
  feedback: { type: String, required: true },
  profile: {
    name: { type: String, required: true },
    img: { type: String, required: true },
  },
});

// Schema cho User Profile
const userProfileSchema = new Schema({
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  university: { type: String, required: true },
  major: { type: String, required: true },
  year: { type: Number, required: true },
  gpa: { type: Number, required: true },
});

// Schema cho Activity Log
const activityLogSchema = new Schema({
  timestamp: { type: Date, required: true },
  action: { type: String, required: true },
  course_id: { type: String, required: true },
});

// Schema cho Certificate
const certificateSchema = new Schema({
  certificate_id: { type: String, required: true },
  course_id: { type: String, required: true },
  issued_date: { type: Date, required: true },
});

// Schema cho User (Student)
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["student", "trainer", "admin"] },
  profile: userProfileSchema,
  enrolled_courses: [
    {
      course_id: { type: Schema.Types.ObjectId, ref: "Course" },
      progress: { type: Number, required: true },
      completed: { type: Boolean, required: true },
    },
  ],
  certificates: [certificateSchema],
  activity_log: [activityLogSchema],
});

// Schema cho Category
const categorySchema = new Schema({
  label: { type: String, required: true },
  img: { type: String, required: true },
});

// Schema cho Live Session
const liveSessionSchema = new Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
  description: { type: String, required: true },
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
  Trainer,
  Video,
  Course,
  Feedback,
  User,
  Category,
  LiveSession,
};
