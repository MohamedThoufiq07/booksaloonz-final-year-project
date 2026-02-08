const User = require('../models/User');
const SalonOwner = require('../models/SalonOwner');
const Salon = require('../models/Salon');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper to generate JWT
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// @desc    Register User
// @route   POST /api/auth/user/signup
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // 1. Missing fields validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields (name, email, password)"
            });
        }

        // 2. Check if user already exists
        const sanitizedEmail = email.toLowerCase().trim();
        let user = await User.findOne({ email: sanitizedEmail });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email"
            });
        }

        // 3. Create new user
        user = new User({
            name: name.trim(),
            email: sanitizedEmail,
            password: password.trim(),
            role: 'user'
        });

        // 4. Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        // 5. Save to database
        await user.save();

        // 6. Generate Token
        const token = generateToken(user._id, user.role);

        // 7. Success Response
        res.status(201).json({
            success: true,
            message: "User signup successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error("Signup Error:", err.message);
        res.status(500).json({
            success: false,
            message: "Server Error during signup"
        });
    }
};

// @desc    Login User
// @route   POST /api/auth/user/login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }

        // 2. Find user
        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // 3. Match password
        const isMatch = await bcrypt.compare(password.trim(), user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // 4. Generate Token
        const token = generateToken(user._id, user.role);

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({
            success: false,
            message: "Server Error during login"
        });
    }
};

// @desc    Register Salon Partner
// @route   POST /api/auth/partner/signup
exports.registerOwner = async (req, res) => {
    const { ownerName, email, password, salonName, address, salonPhoto, startingPrice } = req.body;

    try {
        // 1. Validation
        if (!ownerName || !email || !password || !salonName || !address) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields including salon details"
            });
        }

        // 2. Check if owner exists
        const sanitizedEmail = email.toLowerCase().trim();
        let owner = await SalonOwner.findOne({ email: sanitizedEmail });
        if (owner) {
            return res.status(400).json({
                success: false,
                message: "Salon Partner already exists with this email"
            });
        }

        // 3. Create Partner
        owner = new SalonOwner({
            ownerName: ownerName.trim(),
            email: sanitizedEmail,
            password: password.trim(),
            salonName: salonName.trim(),
            role: 'salonOwner'
        });

        const salt = await bcrypt.genSalt(10);
        owner.password = await bcrypt.hash(owner.password, salt);
        await owner.save();

        // 4. Automatically create a Salon entry
        const salon = new Salon({
            name: salonName,
            address: address,
            img: salonPhoto || '',
            startingPrice: startingPrice || 0,
            owner: owner._id
        });
        await salon.save();

        // 5. Generate Token
        const token = generateToken(owner._id, owner.role);

        res.status(201).json({
            success: true,
            message: "Partner signup successful",
            token,
            user: {
                id: owner._id,
                name: owner.ownerName,
                email: owner.email,
                role: owner.role,
                salonName: owner.salonName
            }
        });

    } catch (err) {
        console.error("Partner Signup Error:", err.message);
        res.status(500).json({
            success: false,
            message: "Server Error during partner signup"
        });
    }
};

// @desc    Login Salon Partner
// @route   POST /api/auth/partner/login
exports.loginOwner = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }

        const owner = await SalonOwner.findOne({ email: email.toLowerCase().trim() });
        if (!owner) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password.trim(), owner.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = generateToken(owner._id, owner.role);

        res.json({
            success: true,
            message: "Partner login successful",
            token,
            user: {
                id: owner._id,
                name: owner.ownerName,
                email: owner.email,
                role: owner.role,
                salonName: owner.salonName
            }
        });

    } catch (err) {
        console.error("Partner Login Error:", err.message);
        res.status(500).json({
            success: false,
            message: "Server Error during partner login"
        });
    }
};

// @desc    Get Current User
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
    try {
        let user;
        if (req.user.role === 'salonOwner') {
            user = await SalonOwner.findById(req.user.id).select('-password');
        } else {
            user = await User.findById(req.user.id).select('-password');
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name || user.ownerName,
                email: user.email,
                role: user.role,
                salonName: user.salonName
            }
        });

    } catch (err) {
        console.error("Get Me Error:", err.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
