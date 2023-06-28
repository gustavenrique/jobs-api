const mongoose = require('mongoose')

const Job = new mongoose.Schema({
    company: {
        type: String,
        required: [ true, "Please provide the company" ],
        maxlength: 50
    },
    position: {
        type: String,
        required: [ true, "Please provide the position" ],
        maxlength: 100
    },
    status: {
        type: String,
        required: [ true, "Please provide the status" ],
        enum: [ 'pending', 'interview', 'declined' ],
        default: 'pending'
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [ true, 'Must be logged in' ]
    }
}, { timestamps: true })

module.exports = mongoose.model('Job', Job)