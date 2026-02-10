import mysql from "mysql2/promise";
import env from "../utils/env.js";

const db = mysql.createPool({
  host: env.database.host,
  user: env.database.user,
  password: env.database.password,
  database: env.database.name,
  waitForConnections: true,
  connectionLimit: 10
});

await db.query(`
  CREATE TABLE IF NOT EXISTS test (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
  )
`)
