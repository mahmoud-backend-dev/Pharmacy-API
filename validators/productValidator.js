const { check } = require('express-validator');
const { validatorMiddleWare } = require('../middleware/validatorMiddleWare');
const {BadRequest} = require('../errors')
exports.createProductValidator = [
    check('drug_name').notEmpty().withMessage('Please provide drug name'),
    check('price').notEmpty().withMessage('Please provide price')
    .isNumeric().withMessage('Please provide numeric value'),
    check('town').notEmpty().withMessage('Please provide town'),
    check('expiry_date').notEmpty().withMessage('Please provide expiry date')
        .isDate().withMessage("Invalid Date , enter valid date format as 'YYYY-MM-DD' or 'YYYY/MM/DD' "),
    check('add_pic')
        .custom(async (val, { req }) => {
            if (!req.file)
                throw new BadRequest('Please provided image for drug and content type must be multipart/form-data')
            return true;
        }),
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