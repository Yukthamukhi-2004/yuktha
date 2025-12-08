const express = require("express");
const router = express.Router();
const cartModel = require("../models/cartModel");
const { verifyToken } = require("../middleware/auth");

router.get("/", verifyToken, async (req, res) => {
  try {
    const items = await cartModel.getCartByUser(req.user.userId);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching cart" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "productId and quantity required" });
    }

    const item = await cartModel.addCartItem({
      userId: req.user.userId,
      productId,
      quantity,
    });

    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding cart item" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    await cartModel.removeCartItem(id, req.user.userId);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error removing cart item" });
  }
});

module.exports = router;
