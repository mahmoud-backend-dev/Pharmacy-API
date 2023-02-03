const {
    getAllProducts,
    getMyProducts,
    getMyFavourite,
    createProduct,
    fromCard,
    addToCrad,
} = require('../controller/product');
const router = require('express').Router();

router.route('/getAllProducts').get(getAllProducts);
router.route('/getMyProducts').get(getMyProducts);
router.route('/getMyFavourite').get(getMyFavourite);
router.route('/createProduct').post(createProduct);
router.route('/getCard').get(fromCard);
router.route('/addToCrad').patch(addToCrad);

module.exports = router;
