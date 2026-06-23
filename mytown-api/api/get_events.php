<?php
/**
 * get_events.php — GET
 * Returns all events with live ticket availability from the database.
 */
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    send_json(['success' => false, 'message' => 'Method not allowed'], 405);
}

$result = $conn->query(
    'SELECT id, name, category, event_date, location, price, tickets_total, tickets_remaining
     FROM events
     ORDER BY id ASC'
);

$events = [];
while ($row = $result->fetch_assoc()) {
    $events[] = [
        'id'               => (int)$row['id'],
        'name'             => $row['name'],
        'category'         => $row['category'],
        'date'             => $row['event_date'],
        'location'         => $row['location'],
        'price'            => $row['price'] == 0 ? '$ 0' : ('$ ' . number_format((float)$row['price'], 2)),
        'ticketsTotal'     => (int)$row['tickets_total'],
        'ticketsRemaining' => (int)$row['tickets_remaining'],
    ];
}

send_json(['success' => true, 'events' => $events]);

$conn->close();
