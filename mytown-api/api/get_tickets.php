<?php
/**
 * get_tickets.php — GET ?email=user@example.com
 * Returns all tickets purchased by this user (for HistoryPage.tsx).
 */
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    send_json(['success' => false, 'message' => 'Method not allowed'], 405);
}

$email = trim($_GET['email'] ?? '');

if ($email === '') {
    send_json(['success' => false, 'message' => 'Email is required.'], 400);
}

$stmt = $conn->prepare(
    'SELECT t.ticket_code, t.holder_name, t.email, t.event_name, t.category, t.event_date,
            t.location, t.unit_price, t.quantity, t.total_price, t.purchased_at
     FROM tickets t
     JOIN users u ON u.id = t.user_id
     WHERE u.email = ?
     ORDER BY t.purchased_at DESC'
);
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();

$tickets = [];
while ($row = $result->fetch_assoc()) {
    $purchasedDate = new DateTime($row['purchased_at']);
    $tickets[] = [
        'ticketCode' => $row['ticket_code'],
        'holderName' => $row['holder_name'],
        'email'      => $row['email'],
        'eventName'  => $row['event_name'],
        'category'   => $row['category'],
        'date'       => $row['event_date'],
        'location'   => $row['location'],
        'price'      => $row['unit_price'] == 0 ? '$ 0' : ('$ ' . number_format((float)$row['unit_price'], 2)),
        'quantity'   => (int)$row['quantity'],
        'totalPrice' => $row['total_price'] == 0 ? '$ 0' : ('$ ' . number_format((float)$row['total_price'], 2)),
        'purchasedOn' => 'Purchased in ' . $purchasedDate->format('F j, Y'),
    ];
}

send_json(['success' => true, 'tickets' => $tickets]);

$stmt->close();
$conn->close();
