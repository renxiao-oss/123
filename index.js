// index.js
require('dotenv').config();
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
const cors = require('cors');
app.use(cors());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint to return client information
app.get('/api/whoami', (req, res) => {
  const ipAddress = req.ip; // Get IP address of client
  const language = req.headers['accept-language']; // Get preferred language from headers
  const software = req.headers['user-agent']; // Get user agent from headers
  
  // Construct response JSON object
  const responseObject = {
    ipaddress: ipAddress,
    language: language,
    software: software
  };
  
  // Send response as JSON
  res.json(responseObject);
});

// Listen for requests
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
