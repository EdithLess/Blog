import { Router } from "express";
import functions from "../db.js";
const { selectPosts, findPostName } = functions;

const router = Router();

router.get("/view_post", async (_req, res) => {
  try {
    const posts = await selectPosts();

    const htmlContent = posts
      .map(
        (post) =>
          `<button><a href=/post/${encodeURIComponent(post.name)}>${
            post.name
          }</a></button>`
      )
      .join("");
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>View Posts</title>
      </head>
      <body>
        <h1>Posts</h1>
        ${htmlContent}
      </body>
      </html>
    `);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Error fetching posts");
  }
});

router.get("/post/:name", async (req, res) => {
  try {
    let name = req.params.name;
    const post = await findPostName(name);
    res.send(post);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching a post");
  }
});

export default router;
