const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const db = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "Admin@123",
    database: "rk_market",
  },
});

const app = express();
app.use(cors());
app.use(express.json());

// Handle user login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await db("registration").where({ email }).first();

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
    return res.status(200).json({ message: "Sign-in successful" });
  } else {
    return res.status(401).json({ error: "Incorrect password" });
  }
});

// Handle user registration
app.post("/register", async (req, res) => {
  const { name, email, password, type, contactNumber } = req.body;

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10); // You can adjust the number of rounds for hashing

  const existingUser = await db("registration").where({ email }).first();

  if (existingUser) {
    return res.status(409).json({ error: "User with this email already exists" });
  } else {
    await db("registration").insert({
      name,
      email,
      password: hashedPassword,
      type,
      contactNumber,
    });
    return res.status(201).json({ message: "Registration successful" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
