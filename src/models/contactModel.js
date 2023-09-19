// const mongoose = require("mongoose");

const db = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "Admin@123",
    database: "rk_market",
  },
});



const contactSchema = db.Schema(
  {
    user_id: {
      type: db.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add the contact email address"],
    },
    phone: {
      type: String,
      required: [true, "Please add the contact phone number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = db.model("Contact", contactSchema);
