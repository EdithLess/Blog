import { sql } from "@vercel/postgres";

let dbClient;

async function getDbClient() {
  if (!dbClient) {
    try {
      dbClient = await sql.connect();
      console.log("Connected to database");
    } catch (error) {
      console.error("Database connection error:", error);
    }
  }
  return dbClient;
}

getDbClient();

// async function setupDatabase() {
//   try {
//     await sql`CREATE TABLE IF NOT EXISTS GoogleUser (
//       id SERIAL PRIMARY KEY,
//       google_id VARCHAR(50) UNIQUE NOT NULL,
//       email VARCHAR(255) UNIQUE NOT NULL,
//       name VARCHAR(100),
//       profile_picture VARCHAR(255),
//       role VARCHAR(255),
//       created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
//     );`;
//     console.log("GoogleUser table created successfully");

//     console.log("Data inserted successfully:");
//   } catch (err) {
//     console.error("Error setting up the database", err.stack);
//   }
// }

// async function postDb() {
//   try {
//     await sql`
// CREATE TABLE IF NOT EXISTS posts (
//   id SERIAL PRIMARY KEY,
//   google_id VARCHAR(50) NOT NULL,
//   name VARCHAR(255) UNIQUE NOT NULL,
//   content JSONB NOT NULL, -- Поле для збереження всіх елементів з порядком
//   created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
//   CONSTRAINT fk_google_user FOREIGN KEY (google_id) REFERENCES googleuser(google_id) ON DELETE CASCADE
// );

//     `;
//     console.log("Posts table created successfully");
//   } catch (err) {
//     console.error("Error setting up the database", err.stack);
//   }
// }

// postDb();

async function writeRole(role, name) {
  try {
    const result = await sql`
      UPDATE googleuser
      SET role = ${role}
      WHERE name = ${name}
      RETURNING *;
    `;

    if (result.rowCount === 0) {
      console.log("No user found with the specified name.");
      return null;
    }

    console.log("User role updated successfully:", result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.error("Error updating user role:", err);
    throw err;
  }
}

async function selectPosts() {
  try {
    const result = await sql`SELECT * FROM "posts"`;
    const posts = result.rows;
    return posts;
  } catch (error) {
    console.log(error);
  }
}

async function findPostName(name) {
  try {
    const result = await sql`
    SELECT * FROM posts
    WHERE name= ${name}`;
    const found = result.rows[0];
    return found;
  } catch (error) {
    console.log(error);
  }
}

const functions = { writeRole, selectPosts, findPostName };
export default functions;

// Використовуйте getDbClient() в запитах до бази
