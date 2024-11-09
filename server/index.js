const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose')
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error: ', err))

app.use('/', require('./routes/authRoutes'));
const port = 5173;
app.listen(port, () => console.log(`Server is running on port ${port}`));