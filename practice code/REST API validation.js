//27-11-25
//  users-api.js
const express = require("express");
const app = express();
app.use(express.json());

let users = [{ id: 1, name: "Yuktha", email: "yuktha@example.com" }];

// GET /api/users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// POST /api/users
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "name and email required" });
  }
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// GET /api/users/:id
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Users API running at http://localhost:${PORT}`);
});
