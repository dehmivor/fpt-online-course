const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema(
  {
    id: { type: Number, required: true },
    review: { type: Number, required: true },
    feedback: { type: String, required: true },
    status: { type: String, required: true, default: "deactive" },
    profile: {
      name: { type: String, required: true },
      img: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

// Thêm tùy chỉnh toJSON
feedbackSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    return ret;
  },
});

// Thêm tùy chỉnh toObject
feedbackSchema.set("toObject", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    return ret;
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
