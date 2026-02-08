const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createBooking, getUserBookings, getSalonBookings, updateStatus } = require('../controllers/bookingController');

router.post('/', auth, createBooking);
router.get('/user/:userId', auth, getUserBookings);
router.get('/salon/:salonId', auth, getSalonBookings);
router.put('/:id/status', auth, updateStatus);

module.exports = router;
