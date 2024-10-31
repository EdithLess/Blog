require("dotenv").config();
require("./db");
const { getCategories } = require("./db");
const PORT = process.env.PORT || 3000;
// const {homepage}=require('./routes')
const express = require("express");
const app = express();

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

app.get("/", async (_req, res) => {
  const category = await getCategories();
  res.status(200).json(category);
});
