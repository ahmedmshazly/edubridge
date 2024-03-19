require('dotenv').config();

const User = require('../models/userModels');
const Jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return Jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);

        // Create a token
        const token = createToken(user._id);

        // Send the token in the response
        res.status(200).json({ message: "Login successful", userId: user._id, name: user.name, email: user.email, token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body; // Include the 'name' in the request body

    try {
        const user = await User.register(name, email, password); // Pass 'name' to the register function

        // Create a token
        const token = createToken(user._id);

        // Send the token in the response
        res.status(200).json({ message: "Registration successful", user: { id: user._id, name: user.name, email: user.email }, token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// test route
const test = async (req, res) => {
    res.json({ message: 'Test success' });
};

module.exports = { loginUser, registerUser, test };
