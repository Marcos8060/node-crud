const express = require('express');
const { getAllProducts, getSingleProduct, addProduct, updateProduct,deleteProduct } = require('../controllers/product.controller');
const router = express.Router();


// get all products
router.get('/', getAllProducts)

// get single product by id
router.get('/:id', getSingleProduct)

// add new product
router.post('/', addProduct)
// update product
router.put('/:id', updateProduct)

// delete
router.delete('/:id', deleteProduct)


module.exports = router;