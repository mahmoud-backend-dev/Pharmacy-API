const { check } = require('express-validator');
const {validatorMiddleWare} = require('../middleware/validatorMiddleWare');
exports.createProductValidator = [
    check('drug_name').notEmpty().withMessage('Please provide drug name'),
    check('price').notEmpty().withMessage('Please provide price')
    .isNumeric().withMessage('Please provide numeric value'),
    check('town').notEmpty().withMessage('Please provide town'),
    check('expiry_date').notEmpty().withMessage('Please provide expiry date'),
    validatorMiddleWare,
]

exports.getCartValidator = [
    check('ID').isMongoId().withMessage('Invalid product id format'),
    validatorMiddleWare,
];

exports.addToCartValidator = [
    check('ID').isMongoId().withMessage('Invalid product id format'),
    check('newQuantity').notEmpty().withMessage('newQuantity field  required')
        .isNumeric().withMessage('newQuantity must be number'),
    validatorMiddleWare,
]