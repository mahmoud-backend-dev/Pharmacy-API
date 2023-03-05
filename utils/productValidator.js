const { check } = require('express-validator');
const validatorMiddleWare = require('../middleware/validatorMiddleWare');
const createProductValidator = [
    check('drug_name').notEmpty().withMessage('Please provide drug name'),
    check('price').notEmpty().withMessage('Please provide price')
    .isNumeric().withMessage('Please provide numeric value'),
    check('town').notEmpty().withMessage('Please provide town'),
    check('expiry_date').notEmpty().withMessage('Please provide expiry date'),
    validatorMiddleWare,
]

module.exports = {
    createProductValidator
}