const { ApiError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err)
  
  if (err instanceof ApiError) 
    return errorResponse(res, err.statusCode, getErrorMessage(err))

  else if (err.code && err.code === 11000)
    return errorResponse(res, StatusCodes.BAD_REQUEST, capitalize(`${Object.keys(err.keyValue)} already in use. Please try another one.`))

  else if (err.name === 'ValidationError')
    return errorResponse(res, StatusCodes.BAD_REQUEST, Object.values(err.errors).map(e => e.message)[0])
  
  return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, getErrorMessage(err))
}

const getErrorMessage = (err) => {
  const message = err.message.split(': ')[2]
  
  return message ? message : err.message ? err.message : 'Oops! An unexpected error occurred'
}

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const errorResponse = (res, status, message) =>  res.status(status).json({ message: message })

module.exports = errorHandlerMiddleware
