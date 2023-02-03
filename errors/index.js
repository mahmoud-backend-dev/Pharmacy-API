const BadRequest = require('./badRequest');
const CustomErrorAPI = require('./customErrorAPI');
const NotFoundError = require('./notFound');
const UnauthenticatedError = require('./unauthenticated');

module.exports = {
    BadRequest,
    CustomErrorAPI,
    NotFoundError,
    UnauthenticatedError,
}