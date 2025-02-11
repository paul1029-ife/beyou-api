const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goal.controller");
const { requireAuth } = require("@clerk/clerk-sdk-node");

router.get("/goals", requireAuth(), goalController.getUserGoals);
router.post("/goals", requireAuth(), goalController.createGoal);
router.put("/goals/:id", requireAuth(), goalController.updateGoal);

module.exports = router;
