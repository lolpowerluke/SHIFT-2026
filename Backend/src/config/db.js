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
    role ENUM('visitor', 'admin', '3rdyear', 'prof') NOT NULL,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
  )
`)

await db.query(`
  CREATE TABLE IF NOT EXISTS images (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL
  )
`)

await db.query(`
  CREATE TABLE IF NOT EXISTS image_user (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user BIGINT UNSIGNED,
    image BIGINT UNSIGNED,
    CONSTRAINT fk_iu_user
      FOREIGN KEY(user)
      REFERENCES users(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT fk_iu_image
      FOREIGN KEY(image)
      REFERENCES images(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE

  )
`)

await db.query(`
  CREATE TABLE IF NOT EXISTS tickets (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user BIGINT UNSIGNED,
    code VARCHAR(255) UNIQUE,
    CONSTRAINT fk_ticket_user
      FOREIGN KEY(user)
      REFERENCES users(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
  )
`)

await db.query(`
  CREATE TABLE IF NOT EXISTS projects (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    course ENUM('Website', 'Installatie', 'Mobile app', 'VR & AR', '3D games', 'Motion')
  )
`)

await db.query(`
  CREATE TABLE IF NOT EXISTS image_project (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project BIGINT UNSIGNED,
    image BIGINT UNSIGNED,
    CONSTRAINT fk_ip_project
      FOREIGN KEY(project)
      REFERENCES projects(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT fk_ip_image
      FOREIGN KEY(image)
      REFERENCES images(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
  )
`)

await db.query(`
  CREATE TABLE IF NOT EXISTS project_user (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user BIGINT UNSIGNED,
    project BIGINT UNSIGNED,
    CONSTRAINT fk_pu_user
      FOREIGN KEY(user)
      REFERENCES users(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT fk_pu_project
      FOREIGN KEY(project)
      REFERENCES projects(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
  )
`)

await db.query(`
  CREATE TABLE IF NOT EXISTS socials (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user BIGINT UNSIGNED,
    social VARCHAR(255) UNIQUE,
    CONSTRAINT fk_social_user
      FOREIGN KEY(user)
      REFERENCES users(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
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
