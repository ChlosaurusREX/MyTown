<?php
/**
 * admin/get_records.php — GET ?table=users|events|tickets
 *
 * Returns every row in the given table, each tagged with:
 *   - is_deleted          (soft-deleted by an approved delete request)
 *   - pending_request_id  (non-null if a delete request is awaiting review)
 *
 * This powers the main Admin data-browsing screens.
 */
require_once __DIR__ . '/../db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    send_json(['success' => false, 'message' => 'Method not allowed'], 405);
}

$table = $_GET['table'] ?? '';
$allowed = ['users', 'events', 'tickets'];
if (!in_array($table, $allowed, true)) {
    send_json(['success' => false, 'message' => 'Invalid table.'], 400);
}

// Pull pending delete requests for this table so we can attach them to rows
$pending = [];
$pStmt = $conn->prepare(
    "SELECT id, target_id FROM delete_requests WHERE target_table = ? AND status = 'pending'"
);
$pStmt->bind_param('s', $table);
$pStmt->execute();
$pResult = $pStmt->get_result();
while ($r = $pResult->fetch_assoc()) {
    $pending[(int)$r['target_id']] = (int)$r['id'];
}
$pStmt->close();

if ($table === 'users') {
    $result = $conn->query(
        'SELECT id, first_name, last_name, email, phone, password, created_at, updated_at, is_deleted
         FROM users ORDER BY id DESC'
    );
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $row['id'] = (int)$row['id'];
        $row['is_deleted'] = (int)$row['is_deleted'];
        $row['pending_request_id'] = $pending[$row['id']] ?? null;
        $rows[] = $row;
    }
} elseif ($table === 'events') {
    $result = $conn->query(
        'SELECT id, name, category, event_date, location, price, tickets_total, tickets_remaining, created_at, is_deleted
         FROM events ORDER BY id ASC'
    );
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $row['id'] = (int)$row['id'];
        $row['is_deleted'] = (int)$row['is_deleted'];
        $row['pending_request_id'] = $pending[$row['id']] ?? null;
        $rows[] = $row;
    }
} else { // tickets
    $result = $conn->query(
        'SELECT id, ticket_code, user_id, event_id, holder_name, email, event_name, category,
                event_date, location, unit_price, quantity, total_price, purchased_at, is_deleted
         FROM tickets ORDER BY id DESC'
    );
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $row['id'] = (int)$row['id'];
        $row['is_deleted'] = (int)$row['is_deleted'];
        $row['pending_request_id'] = $pending[$row['id']] ?? null;
        $rows[] = $row;
    }
}

send_json(['success' => true, 'table' => $table, 'records' => $rows]);

$conn->close();
