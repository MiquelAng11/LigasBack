const express = require('express');
const Sede = require('../models/Sede');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Add a sede
router.post('/', authMiddleware, async (req, res) => {
  const { name } = req.body;
  try {
    const sede = new Sede({ name, user: req.user.id });
    await sede.save();
    res.status(201).json(sede);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all sedes for the user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const sedes = await Sede.find({ user: req.user.id });
    res.json(sedes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
