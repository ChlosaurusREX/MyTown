<?php
/**
 * login.php — POST { email, password }
 * Verifies credentials against the `users` table.
 */
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(['success' => false, 'message' => 'Method not allowed'], 405);
}

$body = get_json_body();
$email    = trim($body['email'] ?? '');
$password = (string)($body['password'] ?? '');

if ($email === '' || $password === '') {
    send_json(['success' => false, 'message' => 'Please enter your email and password.'], 400);
}

$stmt = $conn->prepare('SELECT id, first_name, last_name, email, phone, password FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    send_json(['success' => false, 'message' => 'No account found. Please sign up first.'], 404);
}

$row = $result->fetch_assoc();

// Plain-text compare per project setting (see db.php note for hashed upgrade path)
if ($password !== $row['password']) {
    send_json(['success' => false, 'message' => 'Invalid email or password.'], 401);
}

send_json([
    'success' => true,
    'message' => 'Login successful.',
    'account' => [
        'firstName' => $row['first_name'],
        'lastName'  => $row['last_name'],
        'email'     => $row['email'],
        'phone'     => $row['phone'],
    ],
]);

$stmt->close();
$conn->close();
