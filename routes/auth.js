const {postSingnUp,login,changePassword} = require('../controller/auth');
const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');

router.route('/register').post(postSingnUp);
router.route('/login').post(login);
router.route('/changePassword').patch(authMiddleware, changePassword);

module.exports = router;