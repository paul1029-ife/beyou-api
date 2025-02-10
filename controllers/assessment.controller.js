const Assessment = require("../models/Assessment");

exports.getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({
      courseId: req.params.courseId,
    });
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAssessment = async (req, res) => {
  try {
    const assessment = new Assessment({
      ...req.body,
      courseId: req.params.courseId,
    });
    await assessment.save();
    res.status(201).json(assessment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }
    res.json(assessment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
