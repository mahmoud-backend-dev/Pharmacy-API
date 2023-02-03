const { StatusCodes } = require('http-status-codes');
const CustomErorrAPI = require('./customErrorAPI');

class UnauthenticatedError extends CustomErorrAPI {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
};

module.exports = UnauthenticatedError;