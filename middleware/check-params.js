const mongoose = require('mongoose')
const { BadRequest } = require('../errors/index')

module.exports = (req, _, next) => {
    const { params: { id: job_id } } = req

    const isParamValid = job_id && mongoose.Types.ObjectId.isValid(job_id)

    if (!isParamValid)
        throw new BadRequest("Provide a valid Job identifier")

    next()
}