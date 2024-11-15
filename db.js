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

// Використовуйте getDbClient() в запитах до бази
