const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { registerUser, loginUser, registerOwner, loginOwner, getMe } = require('../controllers/authController');

// User Auth Routes
router.post('/user/signup', registerUser);
router.post('/user/login', loginUser);

// Salon Partner Auth Routes (renamed from /owner to /partner per requirements)
router.post('/partner/signup', registerOwner);
router.post('/partner/login', loginOwner);

// Session Route
router.get('/me', auth, getMe);

module.exports = router;
