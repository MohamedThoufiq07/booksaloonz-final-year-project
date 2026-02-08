const mongoose = require('mongoose');

const SalonOwnerSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: true
    },
    salonName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'salonOwner'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('salonOwner', SalonOwnerSchema);
