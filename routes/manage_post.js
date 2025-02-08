import { Router } from "express";
import { sql } from "@vercel/postgres";
import isLoggedIn from "../source/authCheck.js";

const router = Router();

router.get("/manage_posts", isLoggedIn, async (req, res) => {
  try {
    const { google_id } = req.user; // Отримуємо ID користувача
    const posts = await sql`SELECT * FROM posts WHERE google_id = ${google_id}`;

    res.json(posts.rows);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.put("/manage_posts/:id", isLoggedIn, async (req, res) => {
  try {
    const { google_id } = req.user;
    const { id } = req.params;
    const { name, content } = req.body;

    const postCheck =
      await sql`SELECT * FROM posts WHERE id = ${id} AND google_id = ${google_id}`;
    if (postCheck.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "You can only edit your own posts" });
    }

    // Оновлюємо пост
    await sql`
      UPDATE posts 
      SET name = ${name}, content = ${content} 
      WHERE id = ${id} AND google_id = ${google_id}
    `;

    res.json({ message: "Post updated successfully" });
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ error: "Failed to update post" });
  }
});

router.delete("/manage_posts/:id", isLoggedIn, async (req, res) => {
  try {
    const { google_id } = req.user;
    const { id } = req.params;

    // Перевіряємо, чи належить пост користувачеві
    const postCheck =
      await sql`SELECT * FROM posts WHERE id = ${id} AND google_id = ${google_id}`;
    if (postCheck.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "You can only delete your own posts" });
    }

    // Видаляємо пост
    await sql`DELETE FROM posts WHERE id = ${id} AND google_id = ${google_id}`;

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

export default router;
