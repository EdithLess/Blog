import { Router } from "express";
const router = Router();

router.get("/", (_req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<h1>Welcome to our blog<h1>
    <button> <a href="/login">Login</a></button>
    <button> <a href="/register">Register</a></button>
</body>
</html>`);
});

export default router;
