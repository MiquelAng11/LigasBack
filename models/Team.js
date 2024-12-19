const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  players: [
    {
      name: { type: String, required: true },
      position: { type: String, required: true },
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Team', TeamSchema);
