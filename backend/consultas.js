import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const isNeon =
    process.env.DATABASE_URL &&
    process.env.DATABASE_URL.includes("neon.tech");

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isNeon
        ? {
              rejectUnauthorized: false,
          }
        : false,
});