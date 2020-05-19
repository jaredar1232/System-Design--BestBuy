var { Pool, Client } = require("pg");

colors = require("colors");

var db = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "postgres",
});

db.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

db.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("DATABASE: Connected!".green);
  }
});

module.exports = db;
