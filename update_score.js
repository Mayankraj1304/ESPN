const express = require('express');
const router = express.Router();
const Match = require('./models/match');

// Sample dropdown data
const teams = [ { name: 'India' }, { name: 'Australia' } ];
const players = [ 'Player1', 'Player2', 'Player3' ];

// GET: Render admin_data.ejs with match data
router.get('/update-score', async (req, res) => {
  let match = await Match.findOne();
  if (!match) {
    match = new Match({
      battingTeam: 'India',
      bowlingTeam: 'Australia',
      striker: 'Player1',
      nonStriker: 'Player2',
      bowler: 'Player3',
      runs: 0,
      wickets: 0,
      overs: '0.0',
      innings: '1st',
      status: 'ongoing'
    });
    await match.save();
  }

  res.render('admin_data', { match, teams, players });
});

// POST: Update score data
router.post('/update-score', async (req, res) => {
  const data = req.body;
  let match = await Match.findOne();

  if (match) {
    Object.assign(match, data);
    await match.save();
  }

  res.redirect('/update-score');
});

module.exports = router;
