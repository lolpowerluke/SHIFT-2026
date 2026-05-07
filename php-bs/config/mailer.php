<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

$env = require __DIR__ . '/env.php';

function createMailer(): PHPMailer {
    global $env;

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = 'smtp-auth.mailprotect.be';
    $mail->SMTPAuth   = true;
    $mail->Username   = $env['mail']['mail'];
    $mail->Password   = $env['mail']['pass'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->SMTPOptions = [
        'ssl' => ['verify_peer' => true, 'verify_peer_name' => true],
    ];

    return $mail;
}
