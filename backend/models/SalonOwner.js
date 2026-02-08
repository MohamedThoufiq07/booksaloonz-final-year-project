const mongoose = require('mongoose');

const salonOwnerSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: [true, 'Owner name is required'],
        trim: true
    },
    salonName: {
        type: String,
        required: [true, 'Salon name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        default: 'Tirunelveli, Tamil Nadu, India'
    },
    salonPhoto: {
        type: String,
        default: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80'
    },
    startingPrice: {
        type: Number,
        default: 500
    },
    role: {
        type: String,
        default: 'salonOwner'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SalonOwner', salonOwnerSchema);
