const mongoose = require('mongoose');

const SalonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    img: {
        type: String
    },
    startingPrice: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'salonOwner'
    },
    services: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('salon', SalonSchema);
