const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");
const { requireAuth } = require("../middleware/auth"); // Assuming you have auth middleware

router.get("/courses", courseController.getAllCourses);
router.get("/courses/:id", courseController.getCourseById);
router.post("/courses", requireAuth, courseController.createCourse);
router.put("/courses/:id", requireAuth, courseController.updateCourse);
router.delete("/courses/:id", requireAuth, courseController.deleteCourse);

module.exports = router;
