const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getSalons, searchSalons, addSalon, getSalonById } = require('../controllers/salonController');

router.get('/', getSalons);
router.get('/search', searchSalons);
router.post('/', auth, addSalon);
router.get('/:id', getSalonById);

module.exports = router;
