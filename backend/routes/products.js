const express = require("express");
const router = express.Router();

// temporary in-memory data
let products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 20000 },
];

// GET /api/products
router.get("/", (req, res) => {
  res.json(products);
});

// GET /api/products/:id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
});

// POST /api/products
router.post("/", (req, res) => {
  const { name, price } = req.body;
  if (!name || price == null) {
    return res.status(400).json({ message: "name and price required" });
  }
  const id = products.length ? products[products.length - 1].id + 1 : 1;
  const newProduct = { id, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

module.exports = router;
