const Product = require('../models/product');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequest } = require('../errors');

const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    if (products.length == 0)
        throw new NotFoundError('No Products');
    res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getMyProducts = async (req, res) => {
    const { pharmacyId } = req.user;
    const myProducts = await Product.find({ createBy: pharmacyId }).select({  drug_name: 1, add_pic: 1 });
    if (myProducts.length == 0)
        throw new NotFoundError('No Product Me');
    res.status(StatusCodes.OK).json({ myProducts, count: myProducts.length });
};

const getMyFavourite = async (req, res) => {
    const { pharmacyId } = req.user;
    const myFavouriteProducts = await Product.find({ createBy: pharmacyId, favourite: true })
        .select({  drug_name: 1, add_pic: 1 });
    if (myFavouriteProducts == 0)
        throw new NotFoundError('No Product Favourite Me');
    res.status(StatusCodes.OK).json({ myFavouriteProducts, count: myFavouriteProducts.length });
}

const createProduct = async (req, res) => {
    req.body.createBy = req.user.pharmacyId;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    if (!req.body.expiry_date)
        throw new BadRequest("Please provide expiry data")
    req.body.expiry_date = new Date(req.body.expiry_date).toLocaleDateString("en-US", options);
    const newProduct = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ newProduct });
}

const fromCard = async(req,res)=> {
    const { pharmacyId } = req.user;
    const { ID } = req.query;
    const myCrad = await Product.findOne({ _id:ID ,createBy: pharmacyId }).select({ expiry_date: 1, quantity: 1 });
    if (!myCrad)
        throw new NotFoundError('No Product')
    res.status(StatusCodes.OK).json({ myCrad });
}
const addToCrad = async (req, res) => {
    const { pharmacyId } = req.user;
    const { newQuantity, ID } = req.query;
    const newCrad = await Product.findOneAndUpdate({ _id:ID ,createBy: pharmacyId }, { quantity: newQuantity }
        , { new: true, runValidators: true });
    if (!newCrad)
        throw new NotFoundError(`No Product with id ${ID}`);
    res.status(StatusCodes.OK).json({ newCrad });
}

module.exports = {
    getAllProducts,
    getMyProducts,
    getMyFavourite,
    createProduct,
    fromCard,
    addToCrad,
};
