const { StatusCodes } = require('http-status-codes');
const CustomErorrAPI = require('./customErrorAPI');
class NotFoundError extends CustomErorrAPI{
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
};
module.exports = NotFoundError;