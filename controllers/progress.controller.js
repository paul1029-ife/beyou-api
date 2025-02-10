const Progress = require("../models/Progress");

exports.getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.params.userId })
      .populate("courseId", "title description")
      .populate("assessmentResults.assessmentId");
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const progress = await Progress.findOneAndUpdate(
      {
        userId: req.params.userId,
        courseId: req.params.courseId,
      },
      {
        $set: { lastAccessDate: new Date() },
        ...req.body,
      },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(progress);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateAssessmentResult = async (req, res) => {
  try {
    const progress = await Progress.findOneAndUpdate(
      {
        userId: req.params.userId,
        courseId: req.params.courseId,
      },
      {
        $push: {
          assessmentResults: {
            assessmentId: req.params.assessmentId,
            score: req.body.score,
          },
        },
      },
      { new: true, upsert: true }
    );
    res.json(progress);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
