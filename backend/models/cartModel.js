const db = require("./db");

async function getCartByUser(userId) {
  const result = await db.query(
    "SELECT id, product_id, quantity FROM cart_items WHERE user_id = $1 ORDER BY id",
    [userId]
  );
  return result.rows;
}

async function addCartItem({ userId, productId, quantity }) {
  const result = await db.query(
    `INSERT INTO cart_items (user_id, product_id, quantity)
     VALUES ($1, $2, $3)
     RETURNING id, user_id, product_id, quantity`,
    [userId, productId, quantity]
  );
  return result.rows[0];
}

async function removeCartItem(id, userId) {
  await db.query("DELETE FROM cart_items WHERE id = $1 AND user_id = $2", [
    id,
    userId,
  ]);
}

module.exports = { getCartByUser, addCartItem, removeCartItem };
