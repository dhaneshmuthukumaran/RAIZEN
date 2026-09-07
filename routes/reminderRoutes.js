const express = require("express");
const Reminder = require("../models/Reminder");

const router = express.Router();

// Add reminder
router.post("/", async (req, res) => {
  try {
    const reminder = await Reminder.create(req.body);
    res.status(201).json(reminder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all reminders
router.get("/", async (req, res) => {
  try {
    const reminders = await Reminder.find()
      .populate("patientId")
      .sort({ reminderDate: 1 });

    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark reminder as completed
router.patch("/:id/complete", async (req, res) => {
  try {
    const reminder = await Reminder.findByIdAndUpdate(
      req.params.id,
      { completed: true },
      { new: true }
    );

    if (!reminder) {
      return res.status(404).json({ error: "Reminder not found" });
    }

    res.json(reminder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
