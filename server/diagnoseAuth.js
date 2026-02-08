const mongoose = require('mongoose');
const User = require('./models/User');
const SalonOwner = require('./models/SalonOwner');
require('dotenv').config();

const diagnose = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const users = await User.find({}, 'email name role');
        console.log('--- Users in DB ---');
        console.log(users);

        const owners = await SalonOwner.find({}, 'email ownerName salonName');
        console.log('\n--- Partners in DB ---');
        console.log(owners);

        process.exit(0);
    } catch (err) {
        console.error('Diagnosis failed:', err.message);
        process.exit(1);
    }
};

diagnose();
