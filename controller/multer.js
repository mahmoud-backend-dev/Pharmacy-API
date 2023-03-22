const multer = require('multer');
const {BadRequest}= require('../errors')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images');
    },
    filename: function (req, file, cb) {
        const uniqueText = Date.now() + Math.random() * 10;
        cb(null, uniqueText + '-' + file.originalname);
    }
});

const fileFilter = async (req, file, cb) => {
    if (file.mimetype.startsWith("image"))
        cb(null, true)
    else
        cb(new BadRequest("Only Images allowed"), false);
};
module.exports = multer({ storage, fileFilter }).single('add_pic');