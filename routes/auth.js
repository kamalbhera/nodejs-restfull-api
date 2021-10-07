const router = require("express").Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const AuthController = require('../controllers/AuthController');

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get('/me', passport.authenticate('jwt', { session: false }), AuthController.authUser);

module.exports = router;