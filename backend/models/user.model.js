const mongoose = require("mongoose");
const { Schema } = mongoose;

const certificateSchema = new Schema({
  certificate_id: { type: String, required: true },
  course_id: { type: String, required: true },
  issued_date: { type: String, required: true },
});

const activityLogSchema = new Schema({
  timestamp: { type: String, required: true },
  action: { type: String, required: true },
  course_id: { type: String, required: true },
});

const userProfileSchema = new Schema({
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  university: { type: String, required: true },
  major: { type: String, required: true },
  year: { type: Number, required: true },
  gpa: { type: Number, required: true },
});

const userSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  profile: userProfileSchema,
  enrolled_courses: [
    {
      course_id: { type: String, required: true },
      progress: { type: Number, required: true },
      completed: { type: Boolean, required: true },
    },
  ],
  certificates: [certificateSchema],
  activity_log: [activityLogSchema],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
