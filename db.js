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

async function setupDatabase() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS GoogleUser (
      id SERIAL PRIMARY KEY,
      google_id VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(100),
      profile_picture VARCHAR(255),
      role VARCHAR(255),
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );`;
    console.log("GoogleUser table created successfully");

    console.log("Data inserted successfully:");
  } catch (err) {
    console.error("Error setting up the database", err.stack);
  }
}

setupDatabase();

// Використовуйте getDbClient() в запитах до бази
