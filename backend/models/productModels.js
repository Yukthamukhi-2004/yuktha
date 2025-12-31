const db = require("./db");

async function getAllProducts() {
  const result = await db.query(
    "SELECT id, name, price FROM products ORDER BY id"
  );
  return result.rows;
}

async function getProductById(id) {
  const result = await db.query(
    "SELECT id, name, price FROM products WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

async function createProduct({ name, description, price }) {
  const result = await db.query(
    `INSERT INTO products (name,description, price) VALUES ($1, $2) RETURNING id, name,description,price,created_at`,
    [name, description || null, price]
  );
  return result.rows[0];
}

module.exports = { getAllProducts, getProductById, createProduct };
