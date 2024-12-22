const express = require('express');
const { signup, login, authMiddlewares } = require('../controllers/authController');

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Example of a protected route
// router.get('/protected', authMiddlewares.authenticate, (req, res) => {
//     res.status(200).json({ message: 'Welcome to the protected route!', user: req.user });
// });

module.exports = router;
