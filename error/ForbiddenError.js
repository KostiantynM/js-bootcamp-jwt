const BaseError = require('./BaseError');

class ForbiddenError extends BaseError {
  constructor(options) {
    super(options);

    this.code = "FORBIDDEN_ERR";
    this.message = "Forbidden";
    this.status = 403;
    this.retryable = false;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ForbiddenError;
