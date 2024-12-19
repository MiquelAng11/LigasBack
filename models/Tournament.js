const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  sede: { type: mongoose.Schema.Types.ObjectId, ref: 'Sede', required: true },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  matches: [
    {
      home: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
      away: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    },
  ],
  isLeague: { type: Boolean, default: false }, // true for leagues, false for tournaments
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Tournament', TournamentSchema);
