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
    date DATETIME NOT NULL,
    type ENUM('countdown', 'release', 'during-event', 'after-event') NOT NULL
  )
`)

const [rows] = await db.query('SELECT COUNT(*) as count FROM countdown');

if (rows[0].count === 0) {
  await db.query(`
    INSERT INTO countdown (date, type) VALUES
      ('2026-03-26 10:30:00', 'countdown'),
      ('2026-06-19 17:00:00', 'release'),
      ('2026-06-19 21:00:00', 'during-event')
  `);
}

await db.query(`
  CREATE TABLE IF NOT EXISTS mailsignup (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE
  )
`)

db.getConnection()
  .then(connection => {
    console.log('MySQL Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('MySQL Database connection failed:', err.message);
  });

export default db;
