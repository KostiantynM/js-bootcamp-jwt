class BaseError extends Error {
  constructor(options) {
    super();

    this.name = this.constructor.name;
    this.data = options.data || {};
    this.userMessage = options.userMessage || 'Error accuared while processing request';
    this.status = 500;
    this.retryable = false;

    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * @return {boolean}
   */
  isRetryable() {
    return this.retryable;
  }

  /**
   * @param {boolean} retryable
   * @return {this}
   */
  setRetryable(retryable = true) {
    this.retryable = retryable;
    return this;
  }

  getSafePayload() {
    return {
      code: this.code,
      message: this.userMessage,
      data: this.data,
      status: this.status,
    }
  }
}

module.exports = BaseError;
