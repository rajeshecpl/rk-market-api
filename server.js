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


app.post("/rent-form", async (req, res) => {
  const {
    propertyName,
    propertyType,
    floor,
    totalFloor,
    propertyAge,
    flatType,
    facing,
    propertyArea,
    propertyAvailableFor,
    expectedRent,
    expectedDeposit,
    rentNegotiable,
    monthlyMaintenance,
    maintenanceAmount,
    availableFrom,
    preferredTenants,
  } = req.body;

  try {
    await db("rent_form").insert({
      propertyName,
      propertyType,
      floor,
      totalFloor,
      propertyAge,
      flatType,
      facing,
      propertyArea,
      propertyAvailableFor,
      expectedRent,
      expectedDeposit,
      rentNegotiable,
      monthlyMaintenance,
      maintenanceAmount,
      availableFrom,
      preferredTenants,
    });

    return res.status(201).json({ message: "Rent form registration successful" });
  } catch (error) {
    console.error("Error inserting rent form data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/rent-form", async (req, res) => {
  try {
    const rentFormData = await db.select("*").from("rent_form");
    return res.status(200).json(rentFormData);
  } catch (error) {
    console.error("Error fetching rent form data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});



app.listen(3001, () => {
  console.log("Server is running on port 3001");
});



