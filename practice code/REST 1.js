//26-11-25

//Basic api
const express = require("express");
const app = express();

app.use(express.json()); // body parser for JSON

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
