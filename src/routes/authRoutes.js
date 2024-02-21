// authRoutes.js
// Define the authentication endpoints, create routes to handle user
// registration, login, logout, and any other authentication-related functionality.

const express = require('express');
const router = express.Router();

// Import authentication controller or logic
const authController = require('../Controllers/authController');

// Route for user registration
router.post('/register', authController.register);

// Route for user login
router.post('/login', authController.login);

// Route for user logout
router.post('/logout', authController.logout);

module.exports = router;

