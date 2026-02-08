const Salon = require('../models/Salon');
const searchAlgorithm = require('../algorithms/searchAlgorithm');
const ltrRanking = require('../algorithms/ltrRanking');

// @desc Get All Salons (with Ranking)
exports.getSalons = async (req, res) => {
    try {
        let salons = await Salon.find();
        salons = ltrRanking(salons); // Apply LTR logic
        res.json({
            success: true,
            data: salons
        });
    } catch (err) {
        console.error("Get Salons Error:", err.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc Search Salons
exports.searchSalons = async (req, res) => {
    try {
        const { query } = req.query;
        let salons = await Salon.find();
        salons = searchAlgorithm(salons, query); // Apply BERT-inspired search logic
        salons = ltrRanking(salons); // Rank results
        res.json({
            success: true,
            data: salons
        });
    } catch (err) {
        console.error("Search Salons Error:", err.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc Add Salon (Owner only)
exports.addSalon = async (req, res) => {
    try {
        const { name, address, rating, img, startingPrice } = req.body;
        const newSalon = new Salon({
            name, address, rating, img, startingPrice, owner: req.user.id
        });
        await newSalon.save();
        res.json({
            success: true,
            data: newSalon
        });
    } catch (err) {
        console.error("Add Salon Error:", err.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc Get Salon by ID
exports.getSalonById = async (req, res) => {
    try {
        const salon = await Salon.findById(req.params.id);
        if (!salon) return res.status(404).json({
            success: false,
            message: 'Salon not found'
        });
        res.json({
            success: true,
            data: salon
        });
    } catch (err) {
        console.error("Get Salon by ID Error:", err.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};
