// models/db.js
const { Pool } = require("pg");

console.log(process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // from docker-compose
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
