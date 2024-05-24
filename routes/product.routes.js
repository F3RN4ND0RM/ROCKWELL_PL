const express = require('express');
const router = express.Router();
const { check } = require ("express-validator");
const {getProducts, getProductsById, clickProduct, postProducts} = require('../controllers/products.controller')
const {validateProdXUser} = require('../middlewares/validate-prodXuser')
const {validateForm} = require('../middlewares/validate-form')


router.get('/products/clicks', [
    validateProdXUser
    ], clickProduct)


router.get('/products', getProducts);
 
router.post('/products',[
    check('name_', 'name can not be empty').notEmpty(),
    check('category', 'category can not be empty').notEmpty(),
    check('description', 'description can not be empty').notEmpty(),
    check('image', 'image path can not be empty').notEmpty(),
    check('creator', 'creator name can not be empty').notEmpty(),
    validateForm
    ], postProducts);

router.get('/products/:id', getProductsById);



module.exports = router;


