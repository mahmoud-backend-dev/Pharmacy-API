const { check } = require('express-validator');
const { BadRequest } = require('../errors');
const { validatorMiddleWare } = require('../middleware/validatorMiddleWare');
const User = require('../models/user');
exports.signupValidator = [
  check('pharmacy_name').notEmpty().withMessage('Pharmacy name required'),
  check('Email').notEmpty().withMessage('E-mail required')
    .isEmail().withMessage('E-mail invalid').custom(async (val) => {
      const user = await User.findOne({ Email: val });
      if (user)
        throw new BadRequest(`This E-mail is already  used`);
      return true;
    }),
  check('Password').notEmpty().withMessage('Password required')
    .isLength({ min: 6 }).withMessage('Pasword greater than 6 '),
  validatorMiddleWare,
];

exports.loginValidator = [
  check('Email').notEmpty().withMessage('E-mail required')
  .isEmail().withMessage('E-mail invalid'),
check('Password').notEmpty().withMessage('Password required')
  .isLength({ min: 6 }).withMessage('Pasword greater than 6 '),
validatorMiddleWare,
]

exports.changePasswordValidator = [
  check('currentPassword').notEmpty().withMessage('currentPassword field required'),
  check('newPassword').notEmpty().withMessage('newPassword field required')
    .isLength({ min: 6 }).withMessage('newPassword greater than 6 '),
  validatorMiddleWare,
];


