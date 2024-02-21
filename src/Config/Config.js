// Config.js or database configuration

const mongoose = require('moogoose');

// MongoDB connection URI
const dbURI = 'mongodb://localhost:27017/task_management_db';

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Evenet listeners for Mongoose connection
db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

// Export the Mongoose connection
module.exports = db;