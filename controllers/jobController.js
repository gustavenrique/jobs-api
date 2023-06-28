const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequest, NotFound } = require('../errors/index')

const getJobs = async (req, res) => {
    const { id: user_id } = req.user

    const jobs = await Job
        .find({ user_id: user_id })
        .sort('createdAt')

    res
        .status(StatusCodes.OK)
        .json(jobs)
}

const getJob = async (req, res) => {
    const { user: { id: user_id }, params: { id: _id } } = req

    if (!_id) throw new BadRequest('Provide a valid job ID')

    const job = await Job.findOne({ _id: _id, user_id: user_id })

    if (!job) throw new NotFound('Job not found')

    res.
        status(StatusCodes.OK)
        .json(job)
}

const createJob = async (req, res) => {
    req.body.user_id = req.user.id

    const job = await Job.create(req.body)

    res
        .status(StatusCodes.CREATED)
        .json(job)
}

const updateJob = async (req, res) => {
    const { 
        body: { company, position },
        user: { id: user_id },
        params: { id: job_id }
    } = req

    if (!company && !position) throw new BadRequest("Must fill out the form")

    const job = await Job.findByIdAndUpdate({ user_id: user_id, _id: job_id }, req.body, {
        new: true,
        runValidators: true
    })

    if (!job) throw new NotFound('Job not found')
    
    res.
        status(StatusCodes.OK)
        .json(job)
}

const deleteJob = async (req, res) => {
    const { 
        user: { id: user_id },
        params: { id: job_id }
    } = req

    const job = await Job.findByIdAndDelete({ user_id: user_id, _id: job_id })

    if (!job) throw new NotFound('Job not found')
    
    res.
        status(StatusCodes.NO_CONTENT)
        .send()
}

module.exports = {
    getJob, getJobs, createJob, updateJob, deleteJob
}