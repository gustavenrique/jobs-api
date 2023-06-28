const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequest, NotFound } = require('../errors/index')

const register = async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) 
        throw new BadRequest('Must fill out the form') 

    if (password.length > 12)
        throw new BadRequest('Password cannot be more than 12 characters') 

    const user = await User.create({ ...req.body })

    res
        .status(StatusCodes.CREATED)
        .json({ 
            user: { 
                id: user._id, 
                username: user.username 
            }, 
            token: user.getToken()
        })
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) throw BadRequest('Please provide email and password.')

    const user = await User.findOne({ email: email })

    if (!user) throw new NotFound("User not found")

    const isPassCorrect = await user.validatePassword(password)

    if (!isPassCorrect) throw new BadRequest("Incorrect password")

    res
        .status(StatusCodes.OK)
        .json({
            user: { id: user._id, username: user.username },
            token: user.getToken()
        })
}

module.exports = {
    register, login
}