<?php
/**
 * admin/get_action_log.php — GET
 *
 * Returns the full admin action log (logins, delete requests, approvals,
 * rejections), newest first, joined with the acting admin's name/role.
 * Powers the Admin "History" screen.
 */
require_once __DIR__ . '/../db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    send_json(['success' => false, 'message' => 'Method not allowed'], 405);
}

$result = $conn->query(
    "SELECT l.id, l.admin_id, a.name AS admin_name, a.role AS admin_role,
            l.action, l.target_table, l.target_id, l.delete_request_id,
            l.details, l.created_at
     FROM admin_action_log l
     JOIN admin_users a ON a.id = l.admin_id
     ORDER BY l.created_at DESC, l.id DESC"
);

$logs = [];
while ($row = $result->fetch_assoc()) {
    $row['id'] = (int)$row['id'];
    $row['admin_id'] = (int)$row['admin_id'];
    $row['target_id'] = $row['target_id'] !== null ? (int)$row['target_id'] : null;
    $row['delete_request_id'] = $row['delete_request_id'] !== null ? (int)$row['delete_request_id'] : null;
    $logs[] = $row;
}

send_json(['success' => true, 'logs' => $logs]);

$conn->close();
