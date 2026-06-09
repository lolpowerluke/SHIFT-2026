<?php
// routes/mail.php
// Called from public/index.php after $db and $env are loaded.
// $controller is instantiated in index.php and passed here via closure scope.

use function router\match;

$controller = new MailController($db, $env);

$method = $_SERVER['REQUEST_METHOD'];
$path   = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Strip /mail prefix if routing from index.php
$subpath = preg_replace('#^/mail#', '', $path);

match (true) {
    $method === 'POST' && $subpath === '/signup'  => $controller->mailSignUp(),
    $method === 'POST' && $subpath === '/cancel'  => $controller->mailCancel(),
    $method === 'GET'  && $subpath === '/confirm' => $controller->mailConfirm(),
    default => (function () {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Not found']);
    })(),
};
