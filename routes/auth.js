const router = require('express').Router()
const controller = require('../controllers/authController')

/**
 * @swagger
 * tags:
 *  - name: Auth
 * /api/v1/auth/register:
 *   post:
 *     summary: Sign up
 *     tags: [ Auth ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:          
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 *       400:
 *         description: Must fill out the form correctly
 */
router.post('/register', controller.register)

/**
 * @swagger
 * tags:
 *  - name: Auth
 * /api/v1/auth/login:
 *   post:
 *     summary: Login
 *     tags: [ Auth ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       500:
 *         description: Internal Server Error
 *       400:
 *         description: Didn't fill out the form or it has provided a wrong password
 *       404:
 *         description: User not found
 */
router.post('/login', controller.login)

module.exports = router