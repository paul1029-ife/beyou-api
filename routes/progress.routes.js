const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progress.controller");
const { requireAuth } = require("../middleware/auth");

router.get(
  "/users/:userId/progress",
  requireAuth,
  progressController.getUserProgress
);
router.put(
  "/users/:userId/courses/:courseId/progress",
  requireAuth,
  progressController.updateProgress
);
router.post(
  "/users/:userId/courses/:courseId/assessments/:assessmentId/result",
  requireAuth,
  progressController.updateAssessmentResult
);

module.exports = router;
