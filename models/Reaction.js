const mongoose = require('mongoose');


const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Schema.Types.ObjectId,
    },
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => {
            return new Date(timestamp).toLocaleString();
        },
    }
})

module.exports = reactionSchema;