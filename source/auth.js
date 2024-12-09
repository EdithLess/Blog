import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import { sql } from "@vercel/postgres";
const callbackURL =
  process.env.NODE_ENV === "production"
    ? "https://blog-ml3zc9uze-edithless-projects.vercel.app/google/callback"
    : "http://localhost:5000/google/callback";

// Налаштування Google OAuth2 стратегії
if (!process.env.clientID || !process.env.clientSecret) {
  throw new Error(
    "Missing Google OAuth credentials (clientID or clientSecret)"
  );
}
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: callbackURL,
      passReqToCallback: true,
    },
    async function (_request, _accessToken, _refreshToken, profile, done) {
      try {
        const { rows } = await sql`
          SELECT * FROM GoogleUser WHERE google_id = ${profile.id};
        `;
        let user = rows[0];

        if (!user) {
          const { rows: newUser } = await sql`
            INSERT INTO GoogleUser (google_id, email, name, profile_picture)
            VALUES (${profile.id}, ${profile.email}, ${profile.displayName}, ${profile.picture})
            RETURNING *;
          `;
          user = newUser[0];
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.google_id); // Використовуємо google_id або інший унікальний ідентифікатор
});

passport.deserializeUser(async (googleId, done) => {
  try {
    const { rows } = await sql`
      SELECT * FROM GoogleUser WHERE google_id = ${googleId};
    `;
    done(null, rows[0]);
  } catch (err) {
    done(err, null);
  }
});
