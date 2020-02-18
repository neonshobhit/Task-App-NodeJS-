const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
        required: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true,
})

const Tasks = new mongoose.model('Tasks', taskSchema)

module.exports = Tasks