const jwt = require('jsonwebtoken')
const { Unauthorized } = require('../errors/index')

const auth = (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization || !authorization.startsWith('Bearer '))
            throw new Unauthorized('Please provide valid credentials')
        
        const token = authorization.split(' ')[1]

        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.user = { id: payload.id, username: payload.username }

        next()
    } catch (e) {
        throw new Unauthorized("Please provide valid credentials")
    }
}

module.exports = auth