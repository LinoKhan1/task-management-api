// models/Task.js

const mongoose = require('moogoose');

const taskSchema = new moogoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    deadline:{
        type: Date,
        required: true
    },
    priority:{
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    completed:{
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);