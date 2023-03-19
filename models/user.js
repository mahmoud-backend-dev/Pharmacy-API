const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchame = new mongoose.Schema({
    pharmacy_name: {
        type: String,
        required: [true, 'Please provide pharmacy name'],
    },
    Password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength:6,
    },
    Email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
    },
    passwordChangeAt: Date,
});

userSchame.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
})
userSchame.method('createJWT', function () {
    return jwt.sign({ pharmacyId: this._id, pharmacyName: this.pharmacy_name }
        , process.env.SECRET_KEY, { expiresIn: process.env.JWT_LIFETIME });
});
userSchame.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.Password);
    return isMatch;
};

module.exports = mongoose.model('User', userSchame);