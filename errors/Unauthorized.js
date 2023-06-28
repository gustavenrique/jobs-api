const { StatusCodes } = require('http-status-codes');
const ApiError = require('./ApiError');

class Unauthorized extends ApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthorized;
