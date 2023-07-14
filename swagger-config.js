const swaggerJSDoc = require("swagger-jsdoc");

module.exports = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Jobs API',
            version: '1.0',
            description: 'API for job application management'
        },
    },
    apis: [ './routes/*.js' ]
})