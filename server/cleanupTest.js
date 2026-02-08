const mongoose = require('mongoose');
const User = require('./models/User');
const SalonOwner = require('./models/SalonOwner');
require('dotenv').config();

const clean = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await User.deleteOne({ email: 'perfectthoufiq@gmail.com' });
        await SalonOwner.deleteOne({ email: 'perfectthoufiq@gmail.com' });
        console.log('Cleaned up test user');
        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
};

clean();
