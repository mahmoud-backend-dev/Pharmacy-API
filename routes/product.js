const {
    getAllProducts,
    getMyProducts,
    getMyFavourite,
    createProduct,
    fromCard,
    addToCrad,
} = require('../controller/product');
const uploadToLocal = require('../controller/multer');
const fs = require('fs');
const uploadToCloudinary = require('../controller/cloudinary');
const { BadRequest } = require('../errors');
const { createProductValidator } = require('../utils/productValidator');
const router = require('express').Router();

router.route('/getAllProducts').get(getAllProducts);
router.route('/getMyProducts').get(getMyProducts);
router.route('/getMyFavourite').get(getMyFavourite);
router.route('/createProduct').post(uploadToLocal,
    (req, res, next) => {
        if (!req.file)
            throw new BadRequest('Please provided image for drug and content type must be multipart/form-data')
        next();
    },createProductValidator,
    async (req, res, next) => {
        const uploadedInfo = await uploadToCloudinary(req.file.path);
        req.secure_url = uploadedInfo.secure_url;
        fs.unlinkSync(req.file.path);
        next();
    },
    createProduct);
router.route('/getCard').get(fromCard);
router.route('/addToCrad').patch(addToCrad);



module.exports = router;
