require("dotenv").config();
require("./db");
const PORT = process.env.PORT || 3000;
// const {homepage}=require('./routes')
const express = require("express");
const app = express();

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

app.get("/", (_req, res) => {
  res.send("hey");
});
