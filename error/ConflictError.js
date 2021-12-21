const BaseError = require('./BaseError');

class ConflictError extends BaseError {
  constructor(options) {
    super(options);

    this.code = "CONFLICT_ERR";
    this.message = "Conflict";
    this.status = 409;
    this.retryable = false;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ConflictError;
