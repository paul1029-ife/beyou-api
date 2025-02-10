const express = require("express");
const router = express.Router();
const assessmentController = require("../controllers/assessment.controller");
const { requireAuth } = require("../middleware/auth");

router.get(
  "/courses/:courseId/assessments",
  requireAuth,
  assessmentController.getAssessments
);
router.post(
  "/courses/:courseId/assessments",
  requireAuth,
  assessmentController.createAssessment
);
router.put(
  "/assessments/:id",
  requireAuth,
  assessmentController.updateAssessment
);

module.exports = router;
