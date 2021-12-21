const { isCelebrateError, errors } = require('celebrate');

const { ServerSafeError }  = require('../error');

const richValidationError = (err, req, res, next) => {
  if (!err) return next();

  if (isCelebrateError(err)) {
    // return joiErrorHandler(err, req, res, next);
    const errors = [];
    err.details.forEach((item) =>
      item.details.forEach(
        ({ message, context: { message: ctxMsg, } }) => {
          const errorPayload = {
            message: ctxMsg || message,
          };
          return errors.push(errorPayload);
        },
      ),
    );
    const richError = Object.assign(err, {
      status: 400,
      name: 'BadRequest',
      code: 'WRONG_REQUEST_PARAMETERS',
      userMessage: 'Request didn\'t pass validation',
      data: {
        errors
      }});
    return next(richError);
  }

  return next(err);
};

const errorHandler = (err, req, res, next) => {
  if (!err) return next();

  const safeError = new ServerSafeError(err);
  res.status(safeError.status).json(safeError.getSafePayload());
};

module.exports = {
  richValidationError,
  errorHandler,
};