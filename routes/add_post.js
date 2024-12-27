import { Router } from "express";
import { sql } from "@vercel/postgres";
import isLoggedIn from "../source/authCheck.js";

const router = Router();

// Маршрут для показу форми створення поста
router.get("/add_post", isLoggedIn, (_req, res) => {
  const html_code = `
    <h1>Create a Post</h1>
    <form id="postForm" action="/add_post" method="POST">
      <div id="dynamicFields"></div>
      
      <button type="button" onclick="addElement('image')">Image</button>
      <button type="button" onclick="addElement('header')">Header</button>
      <button type="button" onclick="addElement('text')">Text</button>
      <button type="button" onclick="addElement('video')">Video</button>
      
      <button type="submit">Create Post</button>
    </form>

    <script>
      // Додати динамічний елемент
      function addElement(type) {
        const container = document.getElementById('dynamicFields');
        let deleteBtn = document.createElement('BUTTON');
        deleteBtn.type = "button";
        deleteBtn.name = "X";
        deleteBtn.textContent = "X";
        deleteBtn.onclick = function () {
          this.parentElement.remove();
        };
        container.appendChild(deleteBtn);

        let newElement;
        if (type === 'image') {
          newElement = document.createElement('input');
          newElement.type = 'text';
          newElement.name = 'image';
          newElement.placeholder = 'Enter image URL';
        } else if (type === 'header') {
          newElement = document.createElement('h1');
          newElement.textContent = 'New Header';
          newElement.contentEditable = true;
          newElement.style.border = '1px solid #ccc';
        } else if (type === 'text') {
          newElement = document.createElement('input');
          newElement.type = 'text';
          newElement.name = 'text';
          newElement.placeholder = 'Enter text';
        } else if (type === 'video') {
          const videoContainer = document.createElement('div');
          const input = document.createElement('input');
          input.type = 'text';
          input.name = 'video';
          input.placeholder = 'Enter video URL';

          const previewButton = document.createElement('button');
          previewButton.type = 'button';
          previewButton.textContent = 'Preview Video';
          previewButton.onclick = () => {
            const url = input.value;
            if (url) {
              const iframe = document.createElement('iframe');
              iframe.src = url;
              iframe.width = '560';
              iframe.height = '315';
              iframe.frameBorder = '0';
              iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
              iframe.allowFullscreen = true;

              videoContainer.appendChild(iframe);
            }
          };

          videoContainer.appendChild(input);
          videoContainer.appendChild(previewButton);
          newElement = videoContainer;
        }

        if (newElement) {
          container.appendChild(newElement);
        }
      }

      // Обробник для формування контенту перед надсиланням форми
    document.getElementById("postForm").addEventListener("submit", function (event) {
  const dynamicFields = document.getElementById("dynamicFields").children;
  const contentArray = [];

  for (let field of dynamicFields) {
    if (field.tagName === "H1" || field.tagName === "INPUT" || field.tagName === "IFRAME") {
      const value = field.tagName === "H1" ? field.textContent : field.value;
      contentArray.push({ type: field.tagName.toLowerCase(), value });
    } else if (field.tagName === "DIV") {
      // Якщо це контейнер для відео, шукаємо поле вводу в ньому
      const input = field.querySelector("input[type='text']");
      if (input && input.name === "video") {
        contentArray.push({ type: "video", value: input.value });
      }
    }
  }

  const contentInput = document.createElement("input");
  contentInput.type = "hidden";
  contentInput.name = "content";
  contentInput.value = JSON.stringify(contentArray);

  this.appendChild(contentInput);
});

    </script>
  `;
  res.send(html_code);
});

router.post("/add_post", isLoggedIn, async (req, res) => {
  const { content } = req.body;

  try {
    const googleId = req.user.google_id;
    const postName = `Post by ${req.user.name} - ${new Date().toISOString()}`;
    const contentJson = JSON.stringify(content);

    const { rows } = await sql`
      INSERT INTO posts (google_id, name, content)
      VALUES (${googleId}, ${postName}, ${contentJson}::jsonb)
      RETURNING *;
    `;
    res.send(
      `<h1>Post created successfully!</h1><pre>${JSON.stringify(rows[0])}</pre>`
    );
    console.log("Content in database:", rows[0].content);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).send("Error creating post");
  }
});

export default router;
