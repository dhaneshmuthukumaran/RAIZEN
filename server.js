require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const patientRoutes = require("./routes/patientRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const reminderRoutes = require("./routes/reminderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

app.get("/", (req, res) => {
  res.json({
    message: "Cognitive Gaming Backend is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    database:
      mongoose.connection.readyState === 1
        ? "Connected"
        : "Disconnected",
  });
});

app.use("/api/patients", patientRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/reminders", reminderRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
