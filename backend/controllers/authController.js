const User = require('../models/User');
const SalonOwner = require('../models/SalonOwner');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Email validation regex
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

// @desc    Register User
// @route   POST /api/auth/user/signup
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Validation
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        if (name.length < 3) {
            return res.status(400).json({ success: false, message: 'Name must be at least 3 characters long' });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // NOTE: Auto-login disabled as per requirements. Redirect to login.
        res.status(201).json({
            success: true,
            message: 'Signup successful. Please login.',
        });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ success: false, message: 'Server error during signup' });
    }
};

// @desc    Login User
// @route   POST /api/auth/user/login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            role: 'user',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: 'user'
            }
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
};

// @desc    Register Salon Partner
// @route   POST /api/auth/partner/signup
exports.registerPartner = async (req, res) => {
    try {
        const { ownerName, salonName, email, password } = req.body;

        // 1. Validation
        if (!ownerName || !salonName || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        if (ownerName.length < 3) {
            return res.status(400).json({ success: false, message: 'Owner name must be at least 3 characters long' });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
        }

        let owner = await SalonOwner.findOne({ email });
        if (owner) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        owner = await SalonOwner.create({
            ownerName,
            salonName,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: 'Partner registration successful. Please login.',
        });
    } catch (error) {
        console.error('Partner Signup Error:', error);
        res.status(500).json({ success: false, message: 'Server error during partner signup' });
    }
};

// @desc    Login Salon Partner
// @route   POST /api/auth/partner/login
exports.loginPartner = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const owner = await SalonOwner.findOne({ email });
        if (!owner) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, owner.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: owner._id, role: 'salonOwner' }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            role: 'salonOwner',
            user: {
                id: owner._id,
                name: owner.ownerName,
                salonName: owner.salonName,
                email: owner.email,
                role: 'salonOwner'
            }
        });
    } catch (error) {
        console.error('Partner Login Error:', error);
        res.status(500).json({ success: false, message: 'Server error during partner login' });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user;

        if (decoded.role === 'user') {
            user = await User.findById(decoded.id).select('-password');
        } else if (decoded.role === 'salonOwner') {
            user = await SalonOwner.findById(decoded.id).select('-password');
        }

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                id: user._id,
                role: decoded.role
            }
        });
    } catch (error) {
        console.error('GetMe Error:', error);
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};
