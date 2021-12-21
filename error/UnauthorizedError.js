const BaseError = require('./BaseError');

class UnauthorizedError extends BaseError {
  constructor(options) {
    super(options);

    this.code = "UNAUTHORIZED_ERR";
    this.message = "Unauthorized";
    this.status = 401;
    this.retryable = false;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = UnauthorizedError;
