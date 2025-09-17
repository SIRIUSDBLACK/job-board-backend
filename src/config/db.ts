import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl : {rejectUnauthorized : false}
});

export const connectDB = async () => {
  try {
    await pool.connect();
    console.log("✅ PostgreSQL connected");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
  }
};

