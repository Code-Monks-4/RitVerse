const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

// Signup Controller
const signup = async (req, res) => {
    try {
        // console.log(req.body)
        const { email, password, role, name } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            email,
            password: hashedPassword,
            role, 
            name
        });

        // Save the user to the database
        await user.save();

        // Generate a JWT token
        const token = jwt.sign({ _id: user._id, role: user.role }, "Namokar", { expiresIn: '7d' });
        user.tokens.push({ token });
        await user.save();

        res.status(201).json({ message: 'Signup successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate a new JWT token
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        user.tokens.push({ token });
        await user.save();

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Middleware for authentication
const authMiddlewares = {
    authenticate: async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

            if (!user) {
                throw new Error('Authentication failed');
            }

            req.user = user;
            req.token = token;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Please authenticate', error: error.message });
        }
    },

    authorizeRoles: (roles) => {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Access denied' });
            }
            next();
        };
    },
};

// Routes
const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes example
router.get('/protected-route', authMiddlewares.authenticate, (req, res) => {
    res.status(200).json({ message: 'You have accessed a protected route.', user: req.user });
});

module.exports = { router, signup, login, authMiddlewares };
