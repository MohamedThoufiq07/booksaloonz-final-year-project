const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createBooking, getUserBookings, getSalonBookings, updateStatus, deleteBooking } = require('../controllers/bookingController');

router.post('/', auth, createBooking);
router.get('/user/:userId', auth, getUserBookings);
router.get('/salon/:salonId', auth, getSalonBookings);
router.put('/:id/status', auth, updateStatus);
router.delete('/:id', auth, deleteBooking);

module.exports = router;
