const BaseError = require('./BaseError');

const defaultStatusCode = 500;
const defaultErrMessage =
  'Error occurred while processing request';
const defaultCode = 'INTERNAL_ERR';

class ServerSafeError extends BaseError {
  constructor(options) {
    super(options);

    this.code = options.code || defaultCode;
    this.userMessage = options.userMessage || defaultErrMessage;
    this.message = options.message || defaultErrMessage;
    const computedStatus = options.status || defaultStatusCode;
    this.status = options.type ? 422 : computedStatus;
    // this.meta = meta;
    // this.meta.msgStack = [...(this.meta.msgStack || []), this.message];

    // Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ServerSafeError;
