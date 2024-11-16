const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.error("JWT_SECRET is not defined in the environment variables.");
    process.exit(1); // Exit process if no secret
}

// Register Route
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with default usertype as 'user'
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            usertype: 'user',
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Create a JWT token with user ID and usertype
        const token = jwt.sign(
            { id: user._id, usertype: user.usertype },
            JWT_SECRET,
            { expiresIn: '1h' } // token expires in 1 hour
        );

        // Send token and usertype back to the client
        res.json({ token, usertype: user.usertype });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
});


// Dashboard Route (for users)
router.get('/dashboard', authMiddleware, (req, res) => {
    // Check if the user type is 'user' (not admin)
    if (req.user.usertype !== 'user') {
        return res.status(403).json({ message: 'Access forbidden: Admins cannot access this page' });
    }

    // Message for users (not admins)
    res.json({ message: 'Welcome User, you have limited access to this dashboard.' });
});

module.exports = router;