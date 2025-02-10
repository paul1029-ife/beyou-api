const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goal.controller");
const { requireAuth } = require("../middleware/auth");

router.get("/users/:userId/goals", requireAuth, goalController.getUserGoals);
router.post("/users/:userId/goals", requireAuth, goalController.createGoal);
router.put("/users/:userId/goals/:id", requireAuth, goalController.updateGoal);

module.exports = router;
