const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('task', TaskSchema);