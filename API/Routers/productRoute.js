const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productController');

// create the end points as below
router.route("/:id").get(productController.getProduct);
router.route("/").get(productController.getAllProducts).post(productController.createProduct)
router.route("/id").delete(productController.deleteProduct)
// Add more routes as needed

//OR Use below
// router.get('/:id', productController.getProduct)
// router.get('/', productController.getAllProducts);


module.exports = router;
