const cipher = require('bcryptjs')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = new mongoose.Schema({
    username: {
        type: String,
        required: [ true, 'Please provide username' ],
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [ true, 'Please provide email' ],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}\])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email address'
        ],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [ true, 'Please provide password' ],
        minlength: 6,
        trim: true
    }
})

User.pre('save', async function() {
    const salt = await cipher.genSalt(10)

    this.password = await cipher.hash(this.password, salt)
})

User.methods.getToken = function() {
    return jwt.sign({
            id: this._id,
            username: this.username
        }, 
        process.env.JWT_SECRET_KEY, 
        { expiresIn: process.env.JWT_EXPIRATION }
    )
}

User.methods.validatePassword = async function(password) {
    return await cipher.compare(password, this.password)
}

module.exports = mongoose.model('User', User)