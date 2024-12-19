const express = require('express');
const Team = require('../models/Team');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Add a team
router.post('/', authMiddleware, async (req, res) => {
  const { name } = req.body;
  try {
    const team = new Team({ name, user: req.user.id });
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all teams for the user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const teams = await Team.find({ user: req.user.id });
    res.json(teams);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a player to a team
router.post('/:teamId/players', authMiddleware, async (req, res) => {
  const { name, position } = req.body;
  try {
    const team = await Team.findOne({ _id: req.params.teamId, user: req.user.id });
    if (!team) return res.status(404).json({ message: 'Team not found' });

    team.players.push({ name, position });
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get players in a team
router.get('/:teamId/players', authMiddleware, async (req, res) => {
  try {
    const team = await Team.findOne({ _id: req.params.teamId, user: req.user.id });
    if (!team) return res.status(404).json({ message: 'Team not found' });

    res.json(team.players);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
