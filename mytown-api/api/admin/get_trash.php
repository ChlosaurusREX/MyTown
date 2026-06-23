<?php
/**
 * admin/get_trash.php — GET ?table=users|events|tickets|all
 *
 * Returns all soft-deleted records (is_deleted = 1) from the given table.
 */
require_once __DIR__ . '/../db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    send_json(['success' => false, 'message' => 'Method not allowed'], 405);
}

$table   = $_GET['table'] ?? 'all';
$allowed = ['users', 'events', 'tickets', 'all'];
if (!in_array($table, $allowed, true)) {
    send_json(['success' => false, 'message' => 'Invalid table.'], 400);
}

$result = [];

if ($table === 'users' || $table === 'all') {
    $r = $conn->query(
        "SELECT id, first_name, last_name, email, phone, created_at FROM users WHERE is_deleted = 1 ORDER BY id DESC"
    );
    $rows = [];
    while ($row = $r->fetch_assoc()) {
        $row['id'] = (int)$row['id'];
        $rows[] = $row;
    }
    $result['users'] = $rows;
}

if ($table === 'events' || $table === 'all') {
    $r = $conn->query(
        "SELECT id, name, category, event_date, location, price, tickets_total, tickets_remaining, created_at
         FROM events WHERE is_deleted = 1 ORDER BY id DESC"
    );
    $rows = [];
    while ($row = $r->fetch_assoc()) {
        $row['id']              = (int)$row['id'];
        $row['tickets_total']   = (int)$row['tickets_total'];
        $row['tickets_remaining']= (int)$row['tickets_remaining'];
        $rows[] = $row;
    }
    $result['events'] = $rows;
}

if ($table === 'tickets' || $table === 'all') {
    $r = $conn->query(
        "SELECT id, ticket_code, holder_name, email, event_name, category, event_date, location,
                unit_price, quantity, total_price, purchased_at
         FROM tickets WHERE is_deleted = 1 ORDER BY id DESC"
    );
    $rows = [];
    while ($row = $r->fetch_assoc()) {
        $row['id']       = (int)$row['id'];
        $row['quantity'] = (int)$row['quantity'];
        $rows[] = $row;
    }
    $result['tickets'] = $rows;
}

send_json(['success' => true, 'trash' => $result]);

$conn->close();
