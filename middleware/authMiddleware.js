const { UnauthenticatedError, NotFoundError,BadRequest } = require('../errors');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const authenticatedMiddleware =asyncHandler( async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer '))
        throw new UnauthenticatedError('Not Bearer Token Provided')
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const user = await User.findById(decoded.pharmacyId);
    if (!user)
        throw new NotFoundError(`The user that belong to this token does no longer exist`)
    // Check if user change his password after token created
    if (user.passwordChangeAt) {
        const passwordChangedTimeStamp = parseInt((
            user.passwordChangeAt.getTime() / 1000
        ), 10);
        // if password changed after token created (Error)
        if (passwordChangedTimeStamp > decoded.iat) 
            throw new BadRequest('User recently changed his password, please login again...');
    }
    const { pharmacyId,pharmacyName } = decoded;
    req.user = { pharmacyId , pharmacyName };
    next()
});

module.exports = authenticatedMiddleware;