<?php
/**
 * signup.php — POST { firstName, lastName, email, phone, password }
 * Creates a new user account in the `users` table.
 */
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(['success' => false, 'message' => 'Method not allowed'], 405);
}

$body = get_json_body();

$firstName = trim($body['firstName'] ?? '');
$lastName  = trim($body['lastName'] ?? '');
$email     = trim($body['email'] ?? '');
$phone     = trim($body['phone'] ?? '');
$password  = (string)($body['password'] ?? '');

if ($firstName === '' || $lastName === '' || $email === '' || $password === '') {
    send_json(['success' => false, 'message' => 'Please fill in all required fields.'], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    send_json(['success' => false, 'message' => 'Please enter a valid email address.'], 400);
}

// Check for existing account with this email
$stmt = $conn->prepare('SELECT id FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->close();
    send_json(['success' => false, 'message' => 'An account with this email already exists.'], 409);
}
$stmt->close();

// Insert new account (plain-text password per project setting — see db.php note)
$stmt = $conn->prepare(
    'INSERT INTO users (first_name, last_name, email, phone, password) VALUES (?, ?, ?, ?, ?)'
);
$stmt->bind_param('sssss', $firstName, $lastName, $email, $phone, $password);

if ($stmt->execute()) {
    send_json([
        'success' => true,
        'message' => 'Account created successfully.',
        'account' => [
            'firstName' => $firstName,
            'lastName'  => $lastName,
            'email'     => $email,
            'phone'     => $phone,
        ],
    ]);
} else {
    send_json(['success' => false, 'message' => 'Failed to create account: ' . $stmt->error], 500);
}

$stmt->close();
$conn->close();
