const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const matchRoutes = require('./update_score');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userAuthDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});
const User = mongoose.model('users', userSchema);

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // EJS views directory
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from public directory
app.use('/src', express.static(path.join(__dirname, 'src'))); // Serve static files from src directory

// ✅ Serve home.html on root path
app.get('/', (req, res) => {
  res.render('home')});

// Serve index page directly
app.get('/index', (req, res) => {
  res.render('index', {
    navItems,
    nav2Items,
    matches,
    foot03Sections
  });
});

// Admin Login Page
app.get('/admin', (req, res) => {
  res.render('admin');
});

const navItems = [
  { name: "Matches", count: 16 },
  { name: "ENG-A vs IND-A", count: 1 },
  { name: "ENG vs WI", count: 1 },
  { name: "TNPL", count: 3 },
  { name: "WCL", count: 2 },
];

const nav2Items = ["Live", "Scores", "Teams", "News", "Features", "Videos", "Stats", "IPL 2025"];

const matches = [
  {
    status: "Live • ",
    type: "75th Match • WCL 2 • ODI •",
    venue: "Dundee",
    overs: "(85 ov)",
    scores: "319/7",
    foot: "Netherlands need 159 runs from 26 overs"
  },
  // Add more match objects
];

const foot03Sections = [
  { heading: "Key Series", details: "IPL 2025 England vs India ..." },
  { heading: "Quick Links", details: "The Dhoni Legacy CricCaster ..." },
  { heading: "Follow ESPNcricinfo", details: "Instagram WhatsApp Twitter ..." },
  { heading: "ESPN cricinfo apps", details: "Android App iOS App" },
];

app.get('/user', (req, res) => {
  res.render('index', {
    navItems,
    nav2Items,
    matches,
    foot03Sections
  });
});

// Login POST
app.post('/update_data', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      res.redirect('/update-score');
    } else {
      res.status(401).send(`
        <h2 style="font-family: Arial; color: red;">Invalid email or password.</h2>
        <a href="/admin">Try again</a>
      `);
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Match Score Routes
app.use('/', matchRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
