// packages
require('dotenv').config();
require('express-async-errors');
const express = require('express');
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
const helmet = require('helmet')
const swaggerUi = require('swagger-ui-express')

// project files
const connectToDb = require('./db/connect')
const swaggerSpec = require('./swagger-config')
const jobRouter = require('./routes/jobs')
const authRouter = require('./routes/auth')
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// setup
const app = express();

app.use(express.json());
app.use('/assets', express.static('assets'))

app.set('trust proxy', 1)
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15s
  max: 100
}))

app.use(helmet())
app.use(cors())
app.use(xss())

// routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api/v1/jobs', jobRouter)
app.use('/api/v1/auth', authRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// startup
(async () => {
  try {
    await connectToDb(process.env.MONGO_CONNECTION_STRING)

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () =>
      console.log(`Server listening on ${process.env.port ?  `port ${PORT}` : `http://localhost:${PORT}`}`)
    );
  } catch (error) {
    console.error(error);
  }
})()