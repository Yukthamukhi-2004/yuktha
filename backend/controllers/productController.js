const productModel = require("../models/productModels");
let products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 20000 },
];

async function getProducts(req, res) {
  try {
    const products = await productModel.getAllProducts();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
}

async function getProduct(req, res) {
  try {
    const id = Number(req.params.id);
    const product = products.find((p) => p.id === id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching product" });
  }
}

async function createProduct(req, res) {
  try {
    const { name, description, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }
    const product = await productModel.createProduct({
      name,
      description,
      price,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ message: "Error creating product" });
  }
}

module.exports = { getProducts, getProduct, createProduct };
