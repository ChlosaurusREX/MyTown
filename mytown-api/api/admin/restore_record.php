<?php
/**
 * admin/restore_record.php — POST { adminId, table, targetId }
 *
 * Restores a soft-deleted record by setting is_deleted = 0.
 * Only super_admin can restore records.
 */
require_once __DIR__ . '/../db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(['success' => false, 'message' => 'Method not allowed'], 405);
}

$body     = get_json_body();
$adminId  = (int)($body['adminId']  ?? 0);
$table    = $body['table']    ?? '';
$targetId = (int)($body['targetId'] ?? 0);

$allowed = ['users', 'events', 'tickets'];
if ($adminId <= 0 || !in_array($table, $allowed, true) || $targetId <= 0) {
    send_json(['success' => false, 'message' => 'Missing or invalid fields.'], 400);
}

// Verify super_admin
$adminStmt = $conn->prepare('SELECT id, name, role FROM admin_users WHERE id = ?');
$adminStmt->bind_param('i', $adminId);
$adminStmt->execute();
$adminRes = $adminStmt->get_result();
if ($adminRes->num_rows === 0) {
    send_json(['success' => false, 'message' => 'Admin not found.'], 404);
}
$admin = $adminRes->fetch_assoc();
$adminStmt->close();

if ($admin['role'] !== 'super_admin') {
    send_json(['success' => false, 'message' => 'Only a Super Admin can restore records.'], 403);
}

// Restore the record
$stmt = $conn->prepare("UPDATE `$table` SET is_deleted = 0 WHERE id = ? AND is_deleted = 1");
$stmt->bind_param('i', $targetId);
$stmt->execute();

if ($stmt->affected_rows === 0) {
    send_json(['success' => false, 'message' => 'Record not found in trash or already restored.'], 404);
}
$stmt->close();

// Cancel any resolved delete request for this record so it doesn't linger
$cancelStmt = $conn->prepare(
    "UPDATE delete_requests SET status = 'rejected' WHERE target_table = ? AND target_id = ? AND status = 'approved'"
);
$cancelStmt->bind_param('si', $table, $targetId);
$cancelStmt->execute();
$cancelStmt->close();

// Log
$action  = 'record_restored';
$details = $admin['name'] . " restored $table #$targetId from trash";
$logStmt = $conn->prepare(
    "INSERT INTO admin_action_log (admin_id, action, target_table, target_id, details) VALUES (?, ?, ?, ?, ?)"
);
$logStmt->bind_param('issis', $adminId, $action, $table, $targetId, $details);
$logStmt->execute();
$logStmt->close();

send_json(['success' => true, 'message' => ucfirst($table) . " #$targetId restored successfully."]);

$conn->close();
