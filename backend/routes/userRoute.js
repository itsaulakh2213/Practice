const express = require('express');
const { registerUser, loginUser, logOut, forgotPassword } = require('../controller/userController');
const router = express.Router();


router.route('/register').post(registerUser);

router.route('/login').post(loginUser)

router.route("/password/forgot").post(forgotPassword)

router.route('/logout').get(logOut)

module.exports = router;