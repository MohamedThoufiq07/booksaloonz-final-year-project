const express = require('express');
const router = express.Router();
const { getProducts, getRecommended, addProduct } = require('../controllers/productController');

router.get('/', getProducts);
router.get('/recommended', getRecommended);
router.post('/', addProduct);

module.exports = router;
