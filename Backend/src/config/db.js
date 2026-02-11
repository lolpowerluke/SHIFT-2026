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
    ticket VARCHAR(255)
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
