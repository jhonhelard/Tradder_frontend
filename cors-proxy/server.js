const express = require('express');
const cors = require('cors');

const app = express();

// Use the CORS middleware
app.use(cors({
  origin: '*', // Allow all origins (use specific origin in production)
  methods: ['GET', 'POST', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type'] // Allowed headers
}));

// Your other routes and middleware
app.get('/api/calendar/earnings', (req, res) => {
  // Your logic to handle the request
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});