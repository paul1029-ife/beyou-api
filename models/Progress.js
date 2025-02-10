const mongoose = require("mongoose");
const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  completedLessons: [
    {
      lessonId: {
        type: String,
        required: true,
      },
      completedDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  assessmentResults: [
    {
      assessmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assessment",
      },
      score: Number,
      completedDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  startDate: {
    type: Date,
    default: Date.now,
  },
  lastAccessDate: {
    type: Date,
    default: Date.now,
  },
  completionPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
});

// Add index for faster queries
progressSchema.index({ userId: 1, courseId: 1 });

const Progress = mongoose.model("Progress", progressSchema);

module.exports = Progress;
