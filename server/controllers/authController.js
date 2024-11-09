// authController.js
const bcrypt = require('bcryptjs');  // Ensure bcryptjs is installed
const UserModel = require('../models/users');

// Simple test endpoint
const testEndpoint = (req, res) => {
    res.json('Hello from the server!');
};

// Register user logic
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if all fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        // Check if password is long enough
        if (password.length < 6) {
            return res.status(400).json({ msg: 'Password must be at least 6 characters long' });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'An account with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword,
        });

        // Send back the created user
        return res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = { testEndpoint, registerUser };
