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
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    role ENUM('visitor', 'admin', '3rdyear', 'prof') DEFAULT 'visitor',
    email VARCHAR(255) UNIQUE,
    token VARCHAR(64) UNIQUE,
    -- status ENUM('pending', 'confirmed') DEFAULT 'pending',
    password VARCHAR(255)
  )
`)

await db.query(`
  CREATE TABLE IF NOT EXISTS media (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cloud_name VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL
  )
`)

await db.query(`
  CREATE TABLE IF NOT EXISTS media_user (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user BIGINT UNSIGNED,
    media BIGINT UNSIGNED,
    CONSTRAINT fk_mu_user
      FOREIGN KEY(user)
      REFERENCES users(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT fk_mu_media
      FOREIGN KEY(media)
      REFERENCES media(id)
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
    promoter ENUM("Dennis Baptist","Maaike Beuten","Joni De Borger","Peter Dickx","Jan Everaert","Bert Heyman","Jan Snoekx","Stefan Tilburgs","Els Vande Kerckhove","An Vanlierde","Kobe Vermeire","Ben Verschooris"),
    description TEXT,
    course ENUM('XR & 3D', 'Experience Design', 'Web & Mobile', 'Digital Deisgn')
  )
`)

await db.query(`
  CREATE TABLE IF NOT EXISTS media_project (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project BIGINT UNSIGNED,
    type ENUM('video', 'image', 'magazine'),
    media BIGINT UNSIGNED,
    CONSTRAINT fk_mp_project
      FOREIGN KEY(project)
      REFERENCES projects(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT fk_mp_media
      FOREIGN KEY(media)
      REFERENCES media(id)
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

await db.query(`
  CREATE TABLE IF NOT EXISTS votes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(64) UNIQUE,
    project BIGINT UNSIGNED,
    CONSTRAINT fk_project_vote
      FOREIGN KEY(project)
      REFERENCES projects(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
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

db.getConnection()
  .then(connection => {
    console.log('MySQL Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('MySQL Database connection failed:', err.message);
  });

export default db;
