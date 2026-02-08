const Booking = require('../models/Booking');
const bookingAlgorithm = require('../algorithms/bookingAlgorithm');

// @desc Create Booking
exports.createBooking = async (req, res) => {
    try {
        const { salon, service, price, date, time } = req.body;

        // Check slot availability
        const existingBookings = await Booking.find({ salon });
        const isAvailable = bookingAlgorithm(existingBookings, date, time);

        if (!isAvailable) {
            return res.status(400).json({
                success: false,
                message: 'Time slot already booked'
            });
        }

        const newBooking = new Booking({
            user: req.user.id,
            salon, service, price, date, time
        });

        await newBooking.save();
        res.json({
            success: true,
            data: newBooking
        });
    } catch (err) {
        console.error("Create Booking Error:", err.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc Get User Bookings
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.params.userId }).populate('salon', 'name');
        res.json({
            success: true,
            data: bookings
        });
    } catch (err) {
        console.error("Get User Bookings Error:", err.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc Get Salon Bookings (Owner only)
exports.getSalonBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ salon: req.params.salonId }).populate('user', 'name email');
        res.json({
            success: true,
            data: bookings
        });
    } catch (err) {
        console.error("Get Salon Bookings Error:", err.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc Update Booking Status
exports.updateStatus = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({
            success: false,
            message: 'Booking not found'
        });

        booking.status = req.body.status;
        await booking.save();
        res.json({
            success: true,
            data: booking
        });
    } catch (err) {
        console.error("Update Booking Status Error:", err.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};
