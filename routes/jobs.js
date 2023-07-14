const router = require('express').Router();
const controller = require('../controllers/jobController')
const authMiddleware = require('../middleware/authentication')
const checkParamsMiddleware = require('../middleware/check-params')

router.use(authMiddleware)

/**
 * @swagger
 * tags:
 *  - name: Jobs
 * /api/v1/jobs:
 *   get:
 *     summary: Get all the user job applications
 *     tags: [ Jobs ]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 *       401:
 *         description: Must provide the auth token
 */
router.get('/', controller.getJobs)

/**
 * @swagger
 * tags:
 *  - name: Jobs
 * /api/v1/jobs:
 *   post:
 *     summary: Create a job application
 *     tags: [ Jobs ]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:          
 *               company:
 *                 type: string
 *               position:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [ pending, interview, declined ]
 *               user_id:
 *                 type: string
 *                 example: 5e1a0651741b255ddda996c4
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 *       400:
 *         description: Incorrect attempt of job application creation
 *       401:
 *         description: Must provide the auth token
 */
router.post('/', controller.createJob)
   
router.use('/:id', checkParamsMiddleware)

/**
 * @swagger
 * tags:
 *  - name: Jobs
 * /api/v1/jobs/{id}:
 *   get:
 *     summary: Get the details of an specific job application
 *     tags: [ Jobs ]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: User not found
 *       400:
 *         description: Must provide the ID
 *       401:
 *         description: Must provide the auth token
 */
router.get('/:id', controller.getJob)

/**
 * @swagger
 * tags:
 *  - name: Jobs
 * /api/v1/jobs/{id}:
 *   patch:
 *     summary: Update a job application
 *     tags: [ Jobs ]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:          
 *               company:
 *                 type: string
 *               position:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [ pending, interview, declined ]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Must provide the auth token
 */
router.patch('/:id', controller.updateJob)

/**
 * @swagger
 * tags:
 *  - name: Jobs
 * /api/v1/jobs/{id}:
 *   delete:
 *     summary: Delete a job application
 *     tags: [ Jobs ]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Must provide the auth token
 */
router.delete('/:id', controller.deleteJob)

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

module.exports = router