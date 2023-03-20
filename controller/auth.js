const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const {
    UnauthenticatedError,
    NotFoundError
} = require('../errors');
const asyncHandler = require('express-async-handler');

const postSingnUp = asyncHandler(async (req, res) => {
    const user = await User.create( req.query );
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ pharmacy_name: user.pharmacy_name, token, });
});

const login = asyncHandler(async (req, res) => {
    const { Email, Password } = req.query;
    const user = await User.findOne({ Email });
    if (!Email || !Password)
        throw new NotFoundError('please provide email , password');
    if (!user)
        throw new UnauthenticatedError('not found email user');
    const isPasswordCorrect = await user.comparePassword(Password);
    if (!isPasswordCorrect)
        throw new UnauthenticatedError('Password not correct');

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ pharmacy_name: user.pharmacy_name, token, });

});

const  changePassword =asyncHandler (async (req, res) => {
    const { currentPassword, newPassword } = req.query;
    const { pharmacyId } = req.user;
    const user = await User.findById(pharmacyId);
    const isPasswordCorrect = await user.comparePassword(currentPassword);
    if (!isPasswordCorrect)
        throw new UnauthenticatedError('Password not correct');
    const newUser = await User.findByIdAndUpdate(
        pharmacyId,
        { Password: newPassword, passwordChangeAt: Date.now() },
        { new: true }
    );
    await newUser.save();
    res.status(StatusCodes.OK).json({ currentPassword, newPassword });
});

module.exports = {
    postSingnUp,
    login,
    changePassword,
}
