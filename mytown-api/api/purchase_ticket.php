<?php
/**
 * purchase_ticket.php — POST { eventId, email, holderName, quantity }
 *
 * This is the core "payment" endpoint. When a user completes payment
 * (or claims a free ticket) in PaymentModal.tsx, the React app calls
 * this endpoint, which:
 *   1. Looks up the event (price, location, etc.) from the events table
 *   2. Checks enough tickets remain
 *   3. Generates a unique ticket code
 *   4. Inserts a row into `tickets` with: name (holder), email, price,
 *      location, ticket id/code — plus event + quantity context
 *   5. Decrements tickets_remaining on the event
 *
 * Returns the saved ticket (including its generated ticket_code) so the
 * frontend can show the ticket/QR screen exactly as before.
 */
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(['success' => false, 'message' => 'Method not allowed'], 405);
}

$body = get_json_body();

$eventId    = (int)($body['eventId'] ?? 0);
$email      = trim($body['email'] ?? '');
$holderName = trim($body['holderName'] ?? '');
$quantity   = max(1, (int)($body['quantity'] ?? 1));

if ($eventId <= 0 || $email === '' || $holderName === '') {
    send_json(['success' => false, 'message' => 'Missing required ticket information.'], 400);
}

// Look up the buyer (must be a registered user)
$stmt = $conn->prepare('SELECT id FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$userResult = $stmt->get_result();
if ($userResult->num_rows === 0) {
    send_json(['success' => false, 'message' => 'No account found for this email.'], 404);
}
$userId = $userResult->fetch_assoc()['id'];
$stmt->close();

// Look up the event and lock the row for the availability check + decrement
$conn->begin_transaction();

$stmt = $conn->prepare(
    'SELECT name, category, event_date, location, price, tickets_remaining
     FROM events WHERE id = ? FOR UPDATE'
);
$stmt->bind_param('i', $eventId);
$stmt->execute();
$eventResult = $stmt->get_result();

if ($eventResult->num_rows === 0) {
    $conn->rollback();
    send_json(['success' => false, 'message' => 'Event not found.'], 404);
}

$event = $eventResult->fetch_assoc();
$stmt->close();

if ($event['tickets_remaining'] < $quantity) {
    $conn->rollback();
    send_json(['success' => false, 'message' => 'Not enough tickets remaining for this event.'], 409);
}

$unitPrice  = (float)$event['price'];
$totalPrice = round($unitPrice * $quantity, 2);

// Generate a unique ticket code, e.g. TKT-SHANGH-AB12CD
$slug = strtoupper(substr(preg_replace('/\s+/', '', $event['name']), 0, 6));
do {
    $ticketCode = sprintf(
        'TKT-%s-%s%s',
        $slug,
        strtoupper(base_convert((string)time(), 10, 36)),
        strtoupper(substr(bin2hex(random_bytes(3)), 0, 3))
    );
    $check = $conn->prepare('SELECT id FROM tickets WHERE ticket_code = ?');
    $check->bind_param('s', $ticketCode);
    $check->execute();
    $exists = $check->get_result()->num_rows > 0;
    $check->close();
} while ($exists);

// Insert the ticket / payment record
$stmt = $conn->prepare(
    'INSERT INTO tickets
        (ticket_code, user_id, event_id, holder_name, email, event_name, category, event_date, location, unit_price, quantity, total_price)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
);
$stmt->bind_param(
    'siissssssdid',
    $ticketCode,
    $userId,
    $eventId,
    $holderName,
    $email,
    $event['name'],
    $event['category'],
    $event['event_date'],
    $event['location'],
    $unitPrice,
    $quantity,
    $totalPrice
);

if (!$stmt->execute()) {
    $conn->rollback();
    send_json(['success' => false, 'message' => 'Failed to save ticket: ' . $stmt->error], 500);
}
$stmt->close();

// Decrement remaining tickets for the event
$stmt = $conn->prepare('UPDATE events SET tickets_remaining = tickets_remaining - ? WHERE id = ?');
$stmt->bind_param('ii', $quantity, $eventId);
$stmt->execute();
$stmt->close();

$conn->commit();

send_json([
    'success' => true,
    'message' => 'Ticket purchased successfully.',
    'ticket'  => [
        'ticketCode' => $ticketCode,
        'eventName'  => $event['name'],
        'category'   => $event['category'],
        'date'       => $event['event_date'],
        'location'   => $event['location'],
        'price'      => $unitPrice == 0 ? '$ 0' : ('$ ' . number_format($unitPrice, 2)),
        'totalPrice' => $totalPrice == 0 ? '$ 0' : ('$ ' . number_format($totalPrice, 2)),
        'quantity'   => $quantity,
        'holderName' => $holderName,
        'email'      => $email,
    ],
]);

$conn->close();
