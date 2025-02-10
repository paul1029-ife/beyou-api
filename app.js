const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const userRouter = require("./routes/users.routes");
const courseRoutes = require("./routes/course.routes");
const assessmentRoutes = require("./routes/assessments.routes");
const goalRoutes = require("./routes/goal.routes");
const progressRoutes = require("./routes/progress.routes");
const { createClerkClient } = require("@clerk/express");
const mongoose = require("mongoose");
const app = express();

//Connect to MONGODB
mongoose.connect(process.env.MONGODB_URI);

const clerk = new createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

// Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/v1/users", userRouter);
app.use("/api", courseRoutes);
app.use("/api", assessmentRoutes);
app.use("/api", goalRoutes);
app.use("/api", progressRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

app.get("/", (req, res) => {
  res.send("Welcome to BeYou api");
});

app.listen(process.env.PORT, () => {
  console.log(`listening on localhost:${process.env.PORT}`);
});

module.exports = app;
