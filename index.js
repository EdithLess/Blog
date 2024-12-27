import "dotenv/config";

import "./db.js";

const PORT = process.env.PORT || 5000;
import express from "express";
import homepage from "./routes/homepage.js";
import login from "./routes/login.js";
import bloger from "./routes/bloger.js";
import user from "./routes/user.js";
import add_post from "./routes/add_post.js";
const app = express();

app.use(express.urlencoded({ extended: true }));
//routes
app.use(homepage);
app.use(login);
app.use(bloger);
app.use(user);
app.use(add_post);

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
