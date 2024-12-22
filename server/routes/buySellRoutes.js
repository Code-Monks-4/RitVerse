const express = require('express');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    markProductAsSold,
    deleteProduct,
} = require('../controllers/buySellController');

const router = express.Router();

router.post('/create', createProduct);

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.put('/:id',  updateProduct);

router.put('/:id/sell', markProductAsSold);

router.delete('/:id',  deleteProduct);

module.exports = router;
