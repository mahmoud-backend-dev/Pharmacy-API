const cloudinary = require('cloudinary').v2;

// Configuration  Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});


// Upload to cloudianry
const uploadToCloudianry = async (path) => {
    const data = await cloudinary.uploader.upload(path, { folder: 'Product_Pharmacy' });
    return data;
};

module.exports = uploadToCloudianry;
