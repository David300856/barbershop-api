import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "admin",
  password: "admin",
  database: "barbershop",
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("✅ Connected to PostgreSQL");

    const result = await client.query("SELECT NOW()");
    console.log("Database time:", result.rows[0]);

    client.release();
  } catch (error) {
    console.error("❌ Connection error:", error);
  }
}

testConnection(); 