require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectToDb = require('./db/connect')

// security
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
const helmet = require('helmet')

// swagger
const swagger = require('swagger-ui-express')
const yaml = require('yamljs')
const documentation = yaml.load('./swagger.yml')

const jobRouter = require('./routes/jobs')
const authRouter = require('./routes/auth')

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

app.set('trust proxy', 1)
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15s
  max: 100
}))

app.use(helmet())
app.use(cors())
app.use(xss())

// routes
app.use('/api/v1/jobs', jobRouter)
app.use('/api/v1/auth', authRouter)

app.use('/', swagger.serve, swagger.setup(documentation))

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

(async () => {
  try {
    await connectToDb(process.env.MONGO_CONNECTION_STRING)

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () =>
      console.log(`Server listening on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error(error);
  }
})()