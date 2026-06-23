<?php
/**
 * forgot_password.php
 *
 * POST { action: "check", email }
 *   -> verifies an account with this email exists (step 1 of the flow)
 *
 * POST { action: "reset", email, newPassword }
 *   -> updates the account's password (step 2 of the flow)
 */
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(['success' => false, 'message' => 'Method not allowed'], 405);
}

$body   = get_json_body();
$action = $body['action'] ?? '';
$email  = trim($body['email'] ?? '');

if ($email === '') {
    send_json(['success' => false, 'message' => 'Please enter your email.'], 400);
}

if ($action === 'check') {
    $stmt = $conn->prepare('SELECT id FROM users WHERE email = ?');
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 0) {
        send_json(['success' => false, 'message' => 'No account found with this email.'], 404);
    }

    send_json(['success' => true, 'message' => 'Account found.']);
}

if ($action === 'reset') {
    $newPassword = (string)($body['newPassword'] ?? '');

    if ($newPassword === '') {
        send_json(['success' => false, 'message' => 'Please enter a new password.'], 400);
    }

    // Plain-text storage per project setting (see db.php note for hashed upgrade path)
    $stmt = $conn->prepare('UPDATE users SET password = ? WHERE email = ?');
    $stmt->bind_param('ss', $newPassword, $email);

    if ($stmt->execute() && $stmt->affected_rows > 0) {
        send_json(['success' => true, 'message' => 'Password reset successfully.']);
    } else {
        send_json(['success' => false, 'message' => 'No account found with this email.'], 404);
    }
}

send_json(['success' => false, 'message' => 'Invalid action.'], 400);
