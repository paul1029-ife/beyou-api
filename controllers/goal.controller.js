const Goal = require("../models/Goal");

exports.getUserGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.params.userId }).populate(
      "relatedCourses",
      "title description"
    );
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createGoal = async (req, res) => {
  try {
    const goal = new Goal({
      ...req.body,
      userId: req.params.userId,
    });
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.params.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }
    res.json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
