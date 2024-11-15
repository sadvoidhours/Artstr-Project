const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');





dotenv.config(); // Ensure .env file is loaded

const app = express();
app.use(cors());
app.use(express.json());

// Log to verify MONGO_URI is being loaded
console.log('Mongo URI:', process.env.MONGO_URI); // Should show the URI

// Connect to MongoDB (remove deprecated options)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log(error));


app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/products'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));