import { Router } from "express";
import isLoggedIn from "../source/authCheck.js";
import functions from "../db.js";
const { writeRole } = functions;

const router = Router();

router.get("/user", isLoggedIn, async (req, res) => {
  try {
    // Викликаємо writeRole, щоб оновити роль користувача
    const updatedUser = await writeRole("user", req.user.name);

    if (!updatedUser) {
      return res.status(404).send(`<h1>User not found</h1>`);
    }

    res.send(
      `<h1>Hello ${req.user.name || "User"}</h1><p>Role updated to: ${
        updatedUser.role
      }</p>`
    );
  } catch (err) {
    console.error("Error updating role:", err);
    res.status(500).send("Failed to update role");
  }
});

export default router;
