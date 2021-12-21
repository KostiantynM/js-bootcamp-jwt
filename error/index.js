const ConflictError = require('./ConflictError');
const ForbiddenError = require('./ForbiddenError');
const ServerSafeError= require('./ServerSafeError');
const UnauthorizedError = require('./UnauthorizedError');

module.exports = {
    ConflictError,
    ForbiddenError,
    ServerSafeError,
    UnauthorizedError,
}