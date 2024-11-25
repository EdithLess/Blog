import { Router } from "express";
import "../source/auth.js"; // Імпорт конфігурації Passport
import passport from "passport";
import session from "express-session";
import isLoggedIn from "../source/authCheck.js";

const router = Router();

// Налаштування сесії
router.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
  })
);

// Ініціалізація Passport і сесій
router.use(passport.initialize());
router.use(passport.session());

// Роут для логіну
router.get("/login", (_req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

// Роут для автентифікації з Google
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    prompt: "select_account", // Додаємо prompt тут
  })
);

// Колбек після автентифікації Google
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Логіка для успішної автентифікації
    if (req.user) {
      console.log("User authenticated successfully:", req.user);
      res.redirect("/mainpage"); // Редирект на головну сторінку
    } else {
      res.redirect("/login"); // У разі помилки автентифікації
    }
  }
);

// Захищений роут після входу
router.get("/mainpage", isLoggedIn, (req, res) => {
  res.send(
    `<h1>Hello ${req.user.name || "User"}</h1><a href="/logout">Log out</a>
    <h2>Please choose your role</h2>
    <ul>
    <li> <button> <a href="/user">User</a></button></li>
    <li> <button> <a href="/bloger">bloger</a></button></li>
    </ul>`
  );
});

// Роут для виходу
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.clearCookie("connect.sid"); // очищуємо кукі сесії
      res.redirect("/login"); // перенаправлення на логін
    });
  });
});

export default router;
