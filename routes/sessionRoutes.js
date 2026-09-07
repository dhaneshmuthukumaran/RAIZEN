const express = require("express");
const Session = require("../models/Session");

const router = express.Router();

// Save a game session
router.post("/", async (req, res) => {
  try {
    const session = await Session.create(req.body);
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all sessions
router.get("/", async (req, res) => {
  try {
    const sessions = await Session.find()
      .populate("patientId")
      .sort({ createdAt: -1 });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get sessions for one patient
router.get("/patient/:patientId", async (req, res) => {
  try {
    const sessions = await Session.find({
      patientId: req.params.patientId,
    }).sort({ createdAt: -1 });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
