const mongoose = require("mongoose");
const assessmentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ["multiple-choice", "text", "scale"],
        required: true,
      },
      options: [
        {
          type: String,
          required: function () {
            return this.type === "multiple-choice";
          },
        },
      ],
      correctAnswer: {
        type: String,
        required: function () {
          return this.type === "multiple-choice";
        },
      },
    },
  ],
  timeLimit: {
    type: Number, // in minutes
    required: true,
  },
});

const Assessment = mongoose.model("Assessment", assessmentSchema);

module.exports = Assessment;
