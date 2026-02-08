const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    registerPartner,
    loginPartner,
    getMe,
} = require('../controllers/authController');

router.post('/user/signup', registerUser);
router.post('/user/login', loginUser);
router.post('/partner/signup', registerPartner);
router.post('/partner/login', loginPartner);
router.get('/me', getMe);

module.exports = router;
