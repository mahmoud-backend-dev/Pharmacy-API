const {
    getAllProducts,
    getMyProducts,
    getMyFavourite,
    createProduct,
    fromCard,
    addToCrad,
} = require('../controller/product');
const uploadToLocal = require('../controller/multer');
const uploadToCloudinary = require('../controller/cloudinary');

const {
    createProductValidator,
    addToCartValidator,
    getCartValidator,
} = require('../validators/productValidator');
const router = require('express').Router();

router.route('/getAllProducts').get(getAllProducts);
router.route('/getMyProducts').get(getMyProducts);
router.route('/getMyFavourite').get(getMyFavourite);
router.route('/createProduct')
    .post(
        uploadToLocal,
        createProductValidator,
        uploadToCloudinary,
        createProduct
    );
router.route('/getCard')
    .get(
        getCartValidator,
        fromCard
    );
router.route('/addToCrad')
    .patch(
        addToCartValidator,
        addToCrad
    );



module.exports = router;
