const router = require('express').Router();
const controller = require('../controllers/jobController')
const authMiddleware = require('../middleware/authentication')
const checkParamsMiddleware = require('../middleware/check-params')

router.use(authMiddleware)

router.route('/')
    .get(controller.getJobs)
    .post(controller.createJob)

router.use('/:id', checkParamsMiddleware)

router.route('/:id')
    .get(controller.getJob)
    .patch(controller.updateJob)
    .delete(controller.deleteJob)

module.exports = router