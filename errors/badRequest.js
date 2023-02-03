const { StatusCodes } = require('http-status-codes');
const CustomErorrAPI = require('./customErrorAPI');
class BadRequest extends CustomErorrAPI{
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
};

module.exports = BadRequest;