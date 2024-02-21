// authController.js
// Handle the logic for user registration, login, logout
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

// Function to register a new user
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ error: 'User already exists' });

        }
        // Create a new user instance
        user = new User({
            name,
            email,
            password,
        });

        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save the user to the database
        await user.save();

        res.status(201).json({ message: 'User registeres successfully' });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

};

// Function to authenticate and log in a user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Create and return JWT token
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

// Function to logout
exports.logout = (req, res) => {
    // Clear the JWT token stored on the client side
    res.clearCookie('token'); // If using cookies for token storage
    res.status(200).json({ message: 'Logout successful' });
};