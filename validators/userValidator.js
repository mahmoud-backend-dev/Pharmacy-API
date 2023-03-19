const { check } = require('express-validator');
const { validatorMiddleWare } = require('../middleware/validatorMiddleWare');

exports.signupValidator = [
  check('pharmacy_name').notEmpty().withMessage('Pharmacy name required'),
  check('Email').notEmpty().withMessage('E-mail required')
    .isEmail().withMessage('E-mail invalid'),
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


