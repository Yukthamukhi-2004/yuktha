//CRUD OPERATIONS
// file: server.js
const express = require("express");
const app = express();
app.use(express.json());

let products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 20000 },
];

// GET /products – list all
app.get("/products", (req, res) => {
  res.json(products);
});

// GET /products/:id – get one
app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

// POST /products – create
app.post("/products", (req, res) => {
  const { name, price } = req.body;
  if (!name || price == null) {
    return res.status(400).json({ message: "name and price required" });
  }
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name,
    price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /products/:id – update full
app.put("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, price } = req.body;
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products[index] = { id, name, price };
  res.json(products[index]);
});

// DELETE /products/:id – delete
app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  products = products.filter((p) => p.id !== id);
  res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
