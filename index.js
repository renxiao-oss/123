// Require necessary modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const shortid = require('shortid'); // Add shortid module

// Create Express app
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Array to store URL objects
let urls = [];

// Routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// POST endpoint to shorten URL
app.post('/api/shorturl', function(req, res) {
  const { url } = req.body;

  // Validate URL format
  const urlPattern = /^(http|https):\/\/[^ "]+$/;
  if (!urlPattern.test(url)) {
    return res.json({ error: 'invalid url' });
  }

  // Create short URL object
  const shortUrl = {
    original_url: url,
    short_url: shortid.generate() // Generate a short ID for short URL
  };

  // Store short URL object
  urls.push(shortUrl);

  // Response with short URL object
  res.json(shortUrl);
});

// GET endpoint to redirect short URL
app.get('/api/shorturl/:short_url', function(req, res) {
  const { short_url } = req.params;
  const shortUrlObj = urls.find(url => url.short_url === short_url);
  if (!shortUrlObj) {
    return res.json({ error: 'invalid short url' });
  }
  res.redirect(shortUrlObj.original_url);
});

// Start server
app.listen(port, function() {
  console.log(`Server is running on port ${port}`);
});
