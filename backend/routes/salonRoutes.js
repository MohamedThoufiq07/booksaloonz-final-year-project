const express = require('express');
const router = express.Router();
const { getSalons } = require('../controllers/salonController');

router.get('/', getSalons);

module.exports = router;
