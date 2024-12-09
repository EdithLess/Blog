import { Router } from "express";
import isLoggedIn from "../source/authCheck.js";
import writeRole from "../db.js";

const router = Router();

router.get("/bloger", isLoggedIn, async (req, res) => {
  try {
    const updatedUser = await writeRole("bloger", req.user.name);

    res.send(
      `<h1>Hello ${req.user.name || "User"}</h1>
      <p>Role updated to: ${updatedUser.role}</p>`
    );
  } catch (err) {
    console.error("Error updating role:", err);
    res.status(500).send("Failed to update role");
  }
});

export default router;
