<?php

if (!function_exists('requireEnv')) {
    function requireEnv(string $key): string {
        $value = $_ENV[$key] ?? getenv($key);
        if (!$value) {
            error_log("Missing required environment variable: $key");
            exit(1);
        }
        return $value;
    }
}

// Load .env once
if (empty($_ENV['_ENV_LOADED'])) {
    $envFile = __DIR__ . '/../.env';
    if (file_exists($envFile)) {
        $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || str_starts_with($line, '#')) continue;
            [$key, $value] = explode('=', $line, 2);
            $_ENV[trim($key)] = trim($value);
        }
    }
    $_ENV['_ENV_LOADED'] = '1';
}

return [
    'server' => [
        'port'        => requireEnv('PORT'),
        'environment' => requireEnv('NODE_ENV'),
    ],
    'frontend' => [
        'url' => requireEnv('FRONTEND_URL'),
    ],
    'database' => [
        'host' => requireEnv('DB_HOST'),
        'user' => requireEnv('DB_USER'),
        'pass' => requireEnv('DB_PASS'),
        'name' => requireEnv('DB_NAME'),
    ],
    'mail' => [
        'mail' => requireEnv('COMBELL_MAIL'),
        'pass' => requireEnv('COMBELL_PASS'),
    ],
];
