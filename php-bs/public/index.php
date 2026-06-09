<?php

require_once __DIR__ . '/../vendor/autoload.php'; // composer autoload (PHPMailer etc.)
require_once __DIR__ . '/../controllers/MailController.php';

$env = require __DIR__ . '/../config/env.php';
$db  = require __DIR__ . '/../config/db.php';

// CORS
$allowedOrigins = array_map('trim', explode(',', $env['frontend']['url']));
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Health check
if ($path === '/health') {
    try {
        $db->query('SELECT 1');
        echo json_encode(['status' => 'ok', 'message' => 'Server and database are running']);
    } catch (Throwable $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
    }
    exit;
}

// Route groups
if (str_starts_with($path, '/mail')) {
    require __DIR__ . '/../routes/mail.php';
    exit;
}

// Add more route groups here:
// if (str_starts_with($path, '/auth')) { require '../routes/auth.php'; exit; }
// if (str_starts_with($path, '/api'))  { require '../routes/api.php';  exit; }

http_response_code(404);
echo json_encode(['success' => false, 'message' => 'Not found']);
