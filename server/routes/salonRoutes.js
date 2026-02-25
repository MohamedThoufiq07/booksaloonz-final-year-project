const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getSalons, searchSalons, addSalon, getSalonById, updateSalon, deleteSalon } = require('../controllers/salonController');
// Routes
router.get('/', getSalons);
router.get('/search', searchSalons);
router.post('/', auth, addSalon);
router.get('/:id', getSalonById);
router.put('/:id', auth, updateSalon);
router.delete('/:id', auth, deleteSalon);

module.exports = router;
