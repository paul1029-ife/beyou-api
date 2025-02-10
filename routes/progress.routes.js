const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progress.controller");
const { requireAuth } = require("../middleware/auth");
router.get("/progress", requireAuth(), progressController.getUserProgress);
router.put(
  "/courses/:courseId/progress",
  requireAuth(),
  progressController.updateProgress
);
router.post(
  "/courses/:courseId/assessments/:assessmentId/result",
  requireAuth(),
  progressController.updateAssessmentResult
);

module.exports = router;
