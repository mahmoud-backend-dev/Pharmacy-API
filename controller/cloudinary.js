const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const asyncHandler = require('express-async-handler');
// Configuration  Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});


// Upload to cloudianry
const uploadToCloudianry = asyncHandler(async (req, res, next) => {
    const data = await cloudinary.uploader.upload(req.file.path, { folder: 'Product_Pharmacy' });
    req.secure_url = data.secure_url;
    fs.unlinkSync(req.file.path);
    next();
});

module.exports = uploadToCloudianry

