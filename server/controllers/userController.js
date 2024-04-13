require('dotenv').config();

const User = require('../models/userModels');
const Jwt = require('jsonwebtoken');

const createToken = (_id) => {
    const expiresIn = 60 * 60 * 24 * 3; // Convert 3 days into seconds
    const token = Jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: expiresIn });
    return { token, expiresAt: Date.now() + expiresIn * 1000 }; // Current time + 3 days in milliseconds
};

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);

        // Create a token and get expiry time
        const { token, expiresAt } = createToken(user._id);

        // Send the token and expiry time in the response
        res.status(200).json({ 
            message: "Login successful", 
            userId: user._id, 
            name: user.name, 
            email: user.email, 
            token: token, 
            expiresAt: expiresAt 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.register(name, email, password);

        // Create a token and get expiry time
        const { token, expiresAt } = createToken(user._id);

        // Send the token and expiry time in the response
        res.status(200).json({ 
            message: "Registration successful", 
            user: { id: user._id, name: user.name, email: user.email }, 
            token: token, 
            expiresAt: expiresAt 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// test route
const test = async (req, res) => {
    res.json({ message: 'Test success' });
};

module.exports = { loginUser, registerUser, test };
