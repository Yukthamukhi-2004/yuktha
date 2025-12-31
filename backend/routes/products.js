const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/products", productController.getProducts);
router.get("/:id", productController.getProduct);
router.post("/", productController.createProduct);

module.exports = router;
