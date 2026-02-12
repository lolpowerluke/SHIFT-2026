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
  CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    ticket VARCHAR(255) UNIQUE
  )
`)

await db.query(`
  CREATE TABLE IF NOT EXISTS countdown (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    date DATETIME
  )
`)

const [rows] = await db.query('SELECT COUNT(*) as count FROM countdown');

if (rows[0].count === 0) {
  await db.query(`
    INSERT INTO countdown (date) VALUES
      ('2025-12-25 00:00:00'),
      ('2026-01-01 00:00:00'),
      ('2026-02-14 18:00:00'),
      ('2026-03-15 12:00:00'),
      ('2026-07-04 16:00:00'),
      ('2026-10-31 20:00:00'),
      ('2026-12-25 00:00:00'),
      ('2027-01-01 00:00:00')
  `);
}

db.getConnection()
  .then(connection => {
    console.log('MySQL Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('MySQL Database connection failed:', err.message);
  });

export default db;
