// index.js
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Enable JSON parsing
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error: ', err));

// CORS configuration for frontend
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Use authRoutes for routes starting with '/auth'
app.use('/auth', require('./routes/authRoutes'));  // Ensure this path is correct

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
