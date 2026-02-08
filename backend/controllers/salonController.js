const SalonOwner = require('../models/SalonOwner');

// @desc    Get all registered salons
// @route   GET /api/salons
// @access  Public
exports.getSalons = async (req, res) => {
    try {
        const salons = await SalonOwner.find({}).select('-password');

        // Map fields to match what frontend expects if necessary
        const formattedSalons = salons.map(salon => ({
            id: salon._id,
            name: salon.salonName,
            address: salon.address,
            img: salon.salonPhoto,
            startingPrice: salon.startingPrice,
            rating: 4.5, // Default rating since not in model yet
            ownerName: salon.ownerName,
            email: salon.email
        }));

        res.status(200).json({
            success: true,
            count: formattedSalons.length,
            data: formattedSalons
        });
    } catch (error) {
        console.error('Fetch Salons Error:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching salons' });
    }
};
