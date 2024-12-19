const express = require('express');
const Tournament = require('../models/Tournament');
const Team = require('../models/Team');
const Sede = require('../models/Sede');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Add a tournament or league
router.post('/', authMiddleware, async (req, res) => {
  const { name, date, sede, teams, isLeague } = req.body; // isLeague determines tournament or league
  try {
    const sedeExists = await Sede.findOne({ _id: sede, user: req.user.id });
    if (!sedeExists) return res.status(404).json({ message: 'Sede not found' });

    const tournament = new Tournament({ name, date, sede, teams, user: req.user.id, isLeague });
    await tournament.save();
    res.status(201).json(tournament);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all tournaments or leagues
router.get('/', authMiddleware, async (req, res) => {
  const { isLeague } = req.query;
  try {
    const tournaments = await Tournament.find({ user: req.user.id, isLeague });
    res.json(tournaments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Generate matches for a tournament or league
router.post('/:id/generate-matches', authMiddleware, async (req, res) => {
  try {
    const tournament = await Tournament.findOne({ _id: req.params.id, user: req.user.id });
    if (!tournament) return res.status(404).json({ message: 'Tournament/League not found' });

    // Generate matches (round-robin for leagues, knockout for tournaments)
    const matches = [];
    const teamCount = tournament.teams.length;

    if (tournament.isLeague) {
      for (let i = 0; i < teamCount; i++) {
        for (let j = i + 1; j < teamCount; j++) {
          matches.push({ home: tournament.teams[i], away: tournament.teams[j] });
        }
      }
    } else {
      let queue = [...tournament.teams];
      while (queue.length > 1) {
        const home = queue.shift();
        const away = queue.pop();
        matches.push({ home, away });
      }
    }

    tournament.matches = matches;
    await tournament.save();

    res.json({ message: 'Matches generated', matches });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a tournament or league with matches
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const tournament = await Tournament.findOne({ _id: req.params.id, user: req.user.id }).populate('teams sede');
    if (!tournament) return res.status(404).json({ message: 'Tournament/League not found' });

    res.json(tournament);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
