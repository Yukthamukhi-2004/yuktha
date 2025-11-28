const express = require("express");
const router = express.Router();

let cart = []; // later this will come from DB

router.get("/", (req, res) => {
  res.json(cart);
});

router.post("/", (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    return res.status(400).json({ message: "productId and quantity required" });
  }
  const item = { id: cart.length + 1, productId, quantity };
  cart.push(item);
  res.status(201).json(item);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  cart = cart.filter((i) => i.id !== id);
  res.status(204).send();
});

module.exports = router;
