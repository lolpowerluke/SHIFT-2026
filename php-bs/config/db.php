<?php

$env = require __DIR__ . '/env.php';

try {
    $dsn = "mysql:host={$env['database']['host']};dbname={$env['database']['name']};charset=utf8mb4";
    $db = new PDO($dsn, $env['database']['user'], $env['database']['pass'], [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
    error_log('MySQL Database connected successfully');
} catch (PDOException $e) {
    error_log('MySQL Database connection failed: ' . $e->getMessage());
    exit(1);
}

// Create tables
$db->exec("
    CREATE TABLE IF NOT EXISTS users (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        role ENUM('visitor', 'admin', '3rdyear', 'prof') DEFAULT 'visitor',
        email VARCHAR(255) UNIQUE,
        token VARCHAR(64) UNIQUE,
        status ENUM('pending', 'confirmed') DEFAULT 'pending',
        password VARCHAR(255)
    )
");

$db->exec("
    CREATE TABLE IF NOT EXISTS images (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        url VARCHAR(255) NOT NULL
    )
");

$db->exec("
    CREATE TABLE IF NOT EXISTS image_user (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user BIGINT UNSIGNED,
        image BIGINT UNSIGNED,
        CONSTRAINT fk_iu_user FOREIGN KEY(user) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_iu_image FOREIGN KEY(image) REFERENCES images(id) ON DELETE CASCADE ON UPDATE CASCADE
    )
");

$db->exec("
    CREATE TABLE IF NOT EXISTS tickets (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user BIGINT UNSIGNED,
        code VARCHAR(255) UNIQUE,
        CONSTRAINT fk_ticket_user FOREIGN KEY(user) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    )
");

$db->exec("
    CREATE TABLE IF NOT EXISTS projects (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        course ENUM('Website', 'Installatie', 'Mobile app', 'VR & AR', '3D games', 'Motion')
    )
");

$db->exec("
    CREATE TABLE IF NOT EXISTS image_project (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        project BIGINT UNSIGNED,
        image BIGINT UNSIGNED,
        CONSTRAINT fk_ip_project FOREIGN KEY(project) REFERENCES projects(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_ip_image FOREIGN KEY(image) REFERENCES images(id) ON DELETE CASCADE ON UPDATE CASCADE
    )
");

$db->exec("
    CREATE TABLE IF NOT EXISTS project_user (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user BIGINT UNSIGNED,
        project BIGINT UNSIGNED,
        CONSTRAINT fk_pu_user FOREIGN KEY(user) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_pu_project FOREIGN KEY(project) REFERENCES projects(id) ON DELETE CASCADE ON UPDATE CASCADE
    )
");

$db->exec("
    CREATE TABLE IF NOT EXISTS socials (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user BIGINT UNSIGNED,
        social VARCHAR(255) UNIQUE,
        CONSTRAINT fk_social_user FOREIGN KEY(user) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    )
");

$db->exec("
    CREATE TABLE IF NOT EXISTS countdown (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        date DATETIME NOT NULL,
        type ENUM('countdown', 'release', 'during-event', 'after-event') NOT NULL
    )
");

$stmt = $db->query('SELECT COUNT(*) as count FROM countdown');
$row = $stmt->fetch();
if ((int)$row['count'] === 0) {
    $db->exec("
        INSERT INTO countdown (date, type) VALUES
            ('2026-03-26 10:30:00', 'countdown'),
            ('2026-06-19 17:00:00', 'release'),
            ('2026-06-19 21:00:00', 'during-event')
    ");
}

return $db;
