const mongoose = require('mongoose');
const matchSchema = new mongoose.Schema({
  battingTeam: String,
  bowlingTeam: String,
  striker: String,
  nonStriker: String,
  bowler: String,
  runs: Number,
  wickets: Number,
  overs: String,
  innings: String,
  status: String
});
const Match = mongoose.model('Match', matchSchema);

module.exports = Match;