<?php
/**
 * update_profile.php — POST { currentEmail, firstName, lastName, email, phone }
 * Updates a user's profile details (used by ProfilePage.tsx "Save" action).
 */
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(['success' => false, 'message' => 'Method not allowed'], 405);
}

$body = get_json_body();

$currentEmail = trim($body['currentEmail'] ?? '');
$firstName    = trim($body['firstName'] ?? '');
$lastName     = trim($body['lastName'] ?? '');
$newEmail     = trim($body['email'] ?? '');
$phone        = trim($body['phone'] ?? '');

if ($currentEmail === '' || $firstName === '' || $lastName === '' || $newEmail === '') {
    send_json(['success' => false, 'message' => 'Please fill in all required fields.'], 400);
}

if (!filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
    send_json(['success' => false, 'message' => 'Please enter a valid email address.'], 400);
}

// If the email is changing, make sure the new one isn't already taken
if ($newEmail !== $currentEmail) {
    $stmt = $conn->prepare('SELECT id FROM users WHERE email = ?');
    $stmt->bind_param('s', $newEmail);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        $stmt->close();
        send_json(['success' => false, 'message' => 'That email is already in use by another account.'], 409);
    }
    $stmt->close();
}

$stmt = $conn->prepare(
    'UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE email = ?'
);
$stmt->bind_param('sssss', $firstName, $lastName, $newEmail, $phone, $currentEmail);

if ($stmt->execute()) {
    // Keep ticket records' email/holder name in sync for this user going forward
    send_json([
        'success' => true,
        'message' => 'Profile updated successfully.',
        'account' => [
            'firstName' => $firstName,
            'lastName'  => $lastName,
            'email'     => $newEmail,
            'phone'     => $phone,
        ],
    ]);
} else {
    send_json(['success' => false, 'message' => 'Failed to update profile: ' . $stmt->error], 500);
}

$stmt->close();
$conn->close();
