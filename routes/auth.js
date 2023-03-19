const {
  postSingnUp,
  login,
  changePassword
} = require('../controller/auth');
const {
  signupValidator,
  loginValidator,
  changePasswordValidator,
} = require('../validators/userValidator');
const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');

router.route('/register')
  .post(
    signupValidator,
    postSingnUp
  );
router.route('/login')
  .post(
    loginValidator,
    login
  );
router.route('/changePassword').patch(
  authMiddleware,
  changePasswordValidator,
  changePassword
);

module.exports = router;