const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Course title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Course description is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: [
      "Personal Development",
      "Career Skills",
      "Mental Health",
      "Life Skills",
    ],
  },
  level: {
    type: String,
    required: true,
    enum: ["beginner", "intermediate", "advanced"],
  },
  duration: {
    type: Number, // in minutes
    required: true,
  },
  lessons: [
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      order: {
        type: Number,
        required: true,
      },
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
