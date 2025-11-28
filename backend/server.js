require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const productsRouter = require("./routes/products");
app.use("/api/products", productsRouter);
const cartRouter = require("./routes/cart");
app.use("/api/cart", cartRouter);
const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

const dbUrl = process.env.DATABASE_URL;
const redisUrl = process.env.REDIS_URL;

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Flipkart backend up and running!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
