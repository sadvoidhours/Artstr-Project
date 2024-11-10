const bcrypt = require('bcryptjs');  // Ensure bcryptjs is installed
const UserModel = require('../models/users');

// Simple test endpoint
const testEndpoint = (req, res) => {
    res.json('Hello from the server!');
};

// Register user logic
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if all fields are provided
        if (!firstName || !lastName || !email || !password) {
            return res.json({ error: 'Please enter all fields' });
        }

        // Check if password is long enough
        if (password.length < 6) {
            return res.json({ error: 'Password must be at least 6 characters long' });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.json({ error: 'An account with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        // Send back the created user (excluding password for security)
        const { password: _, ...userWithoutPassword } = user.toObject();
        return res.json(userWithoutPassword);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

//login user logic
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({ error: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            res.json({ msg: 'Login successful' });
        }

    } catch (error) {
        console.error(error);
        res.json({ msg: 'Server error' });
    }
};



module.exports = { testEndpoint, registerUser, loginUser };
