// const mongoose = require("mongoose");

// const connectDb = async () => {
//   try {
//     const connect = await mongoose.connect(process.env.CONNECTION_STRING);
//     console.log(
//       "Database connected: ",
//       connect.connection.host,
//       connect.connection.name
//     );
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
// };

// module.exports = connectDb;


const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "Admin@123",
    database: "rk_market",
  },
});

module.exports = db;
