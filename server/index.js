require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Initialize App
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Main Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/salons', require('./routes/salonRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/hairstyle', require('./routes/hairStyleRoutes'));

// Default Route
app.get('/', (req, res) => {
    res.send('BookSaloonz API is running...');
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
