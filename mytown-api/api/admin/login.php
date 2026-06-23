<?php
/**
 * admin/login.php — POST { email, password }
 * Verifies credentials against admin_users and returns the admin's
 * id, name, email, and role (admin / super_admin). The frontend uses
 * the role to decide whether to show Approve/Reject controls.
 *
 * Every successful login is also written to admin_action_log so it
 * shows up in the admin History view.
 */
require_once __DIR__ . '/../db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(['success' => false, 'message' => 'Method not allowed'], 405);
}

$body     = get_json_body();
$email    = trim($body['email'] ?? '');
$password = (string)($body['password'] ?? '');

if ($email === '' || $password === '') {
    send_json(['success' => false, 'message' => 'Please enter your email and password.'], 400);
}

$stmt = $conn->prepare('SELECT id, name, email, password, role FROM admin_users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    send_json(['success' => false, 'message' => 'No admin account found with this email.'], 404);
}

$row = $result->fetch_assoc();

// Plain-text compare, matching the rest of this project's password handling.
if ($password !== $row['password']) {
    send_json(['success' => false, 'message' => 'Invalid email or password.'], 401);
}

// Log the login for the admin History view
$logStmt = $conn->prepare(
    "INSERT INTO admin_action_log (admin_id, action, details) VALUES (?, 'login', ?)"
);
$details = $row['name'] . ' (' . $row['role'] . ') logged in';
$logStmt->bind_param('is', $row['id'], $details);
$logStmt->execute();
$logStmt->close();

send_json([
    'success' => true,
    'message' => 'Login successful.',
    'admin'   => [
        'id'    => (int)$row['id'],
        'name'  => $row['name'],
        'email' => $row['email'],
        'role'  => $row['role'],
    ],
]);

$stmt->close();
$conn->close();
