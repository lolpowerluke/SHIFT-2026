<?php

require_once __DIR__ . '/../config/mailer.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as MailException;

class MailController {
    private PDO $db;
    private array $env;

    public function __construct(PDO $db, array $env) {
        $this->db  = $db;
        $this->env = $env;
    }

    private function json(int $status, array $data): void {
        http_response_code($status);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }

    public function mailSignUp(): void {
        try {
            $body  = json_decode(file_get_contents('php://input'), true);
            $email = trim($body['email'] ?? '');

            if (!$email) {
                $this->json(400, ['success' => false, 'message' => 'Please provide an email.']);
            }
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $this->json(400, ['success' => false, 'message' => 'Please provide a valid email.']);
            }

            $stmt = $this->db->prepare('SELECT token FROM users WHERE email = ?');
            $stmt->execute([$email]);
            $result = $stmt->fetchAll();

            if (count($result) > 0) {
                $token = $result[0]['token'];
            } else {
                $token = bin2hex(random_bytes(32));
                $stmt  = $this->db->prepare('INSERT INTO users (email, token) VALUES (?, ?)');
                $stmt->execute([$email, $token]);
            }

            $confirmUrl = "{$this->env['frontend']['url']}/confirm/?token={$token}";

            $mail = createMailer();
            $mail->setFrom('info@shiftfestival.be');
            $mail->addAddress($email);
            $mail->Subject = 'Confirm signup';
            $mail->Body    = "Click to confirm:\n{$confirmUrl}\n\nYou can safely ignore this if you didn't subscribe.";
            $mail->isHTML(true);
            $mail->AltBody = $mail->Body;
            $mail->Body    = "<p>Click <a href=\"{$confirmUrl}\">here</a> to confirm</p><p>You can safely ignore this if you didn't subscribe.</p>";
            $mail->send();

            $this->json(200, ['success' => true]);
        } catch (MailException $e) {
            error_log('Mail error: ' . $e->getMessage());
            $this->json(500, ['success' => false, 'message' => 'Sign up for mail failed', 'error' => $e->getMessage()]);
        } catch (Throwable $e) {
            error_log('Error: ' . $e->getMessage());
            $this->json(500, ['success' => false, 'message' => 'Sign up for mail failed', 'error' => $e->getMessage()]);
        }
    }

    public function mailConfirm(): void {
        try {
            $token = $_GET['token'] ?? '';

            $stmt = $this->db->prepare('SELECT status FROM users WHERE token = ?');
            $stmt->execute([$token]);
            $result = $stmt->fetchAll();

            if (count($result) === 0) {
                $this->json(400, ['success' => false, 'message' => 'Invalid token', 'short' => 'error']);
            }
            if ($result[0]['status'] === 'confirmed') {
                $this->json(400, ['success' => false, 'message' => 'Mail is already signed up!', 'short' => 'confirmed']);
            }

            $stmt = $this->db->prepare("UPDATE users SET status = 'confirmed' WHERE token = ?");
            $stmt->execute([$token]);

            $this->json(200, ['success' => true, 'short' => 'success']);
        } catch (Throwable $e) {
            error_log('Error: ' . $e->getMessage());
            $this->json(500, ['success' => false, 'message' => 'Failed to confirm signup', 'short' => 'error', 'error' => $e->getMessage()]);
        }
    }

    public function mailCancel(): void {
        try {
            $body  = json_decode(file_get_contents('php://input'), true);
            $email = trim($body['email'] ?? '');

            if (!$email) {
                $this->json(400, ['success' => false, 'message' => 'Please provide an email.']);
            }

            $stmt = $this->db->prepare('SELECT id FROM users WHERE email = ?');
            $stmt->execute([$email]);
            $result = $stmt->fetchAll();

            // NOTE: original JS had inverted logic (returned 400 when email WAS found).
            // Fixed here: return 404 when email NOT found.
            if (count($result) === 0) {
                $this->json(404, ['success' => false, 'message' => "Email doesn't exist in database"]);
            }

            $stmt = $this->db->prepare('DELETE FROM users WHERE email = ?');
            $stmt->execute([$email]);

            $this->json(200, ['success' => true, 'message' => 'Successfully cancelled email subscription']);
        } catch (Throwable $e) {
            error_log('Error: ' . $e->getMessage());
            $this->json(500, ['success' => false, 'message' => 'Failed to cancel email subscription', 'error' => $e->getMessage()]);
        }
    }
}
