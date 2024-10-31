// const { Pool } = require("pg");

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// });

// pool.connect((err) => {
//   if (err) throw err;
//   console.log("connected to db succesfully");
// });

// module.exports = pool;

const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "bond007008",
  database: "E-shop",
});

client.connect();

function getCategories() {
  return new Promise((resolve, reject) => {
    client.query(`SELECT * FROM categories`, (err, res) => {
      if (!err) {
        const result = res.rows;
        resolve(result);
      } else {
        console.log(err.message);
        reject(err);
      }
    });
  });
}

module.exports = {
  getCategories,
};
