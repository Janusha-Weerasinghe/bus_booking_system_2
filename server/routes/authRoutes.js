const express = require ('express');
const router =express.Router();
const authController = require('../controllers/AuthController')
const { signupLimiter, signinLimiter } = require('../middlewares/rateLimiter');

// Routes with rate-limiting and corresponding controllers
router.post('/signup', signupLimiter, authController.signup);
router.post('/signin', signinLimiter, authController.signin);
router.post('/signout',authController.signout );

router.patch('/send-verification-code',authController.sendVerificationCode);


module.exports = router;