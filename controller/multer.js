const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images');
    },
    filename: function (req, file, cb) {
        const uniqueText = Date.now() + Math.random() * 10;
        cb(null, uniqueText + '-' + file.originalname);
    }
});

module.exports = multer({ storage }).single('add_pic');