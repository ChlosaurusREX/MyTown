<?php
/**
 * admin/request_delete.php — POST { adminId, table, targetId, reason? }
 *
 * Used by an Admin (either role) to request deletion of a specific
 * record. This does NOT delete anything — it creates a 'pending' row
 * in delete_requests for a Super Admin to review, and logs the action.
 */
require_once __DIR__ . '/../db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(['success' => false, 'message' => 'Method not allowed'], 405);
}

$body     = get_json_body();
$adminId  = (int)($body['adminId'] ?? 0);
$table    = $body['table'] ?? '';
$targetId = (int)($body['targetId'] ?? 0);
$reason   = trim($body['reason'] ?? '');

$allowed = ['users', 'events', 'tickets'];
if ($adminId <= 0 || !in_array($table, $allowed, true) || $targetId <= 0) {
    send_json(['success' => false, 'message' => 'Missing or invalid request details.'], 400);
}

// Confirm the admin exists
$adminStmt = $conn->prepare('SELECT id, name FROM admin_users WHERE id = ?');
$adminStmt->bind_param('i', $adminId);
$adminStmt->execute();
$adminResult = $adminStmt->get_result();
if ($adminResult->num_rows === 0) {
    send_json(['success' => false, 'message' => 'Admin account not found.'], 404);
}
$admin = $adminResult->fetch_assoc();
$adminStmt->close();

// Confirm the target record exists
$checkStmt = $conn->prepare("SELECT id FROM `$table` WHERE id = ?");
$checkStmt->bind_param('i', $targetId);
$checkStmt->execute();
if ($checkStmt->get_result()->num_rows === 0) {
    send_json(['success' => false, 'message' => 'Record not found.'], 404);
}
$checkStmt->close();

// Prevent duplicate pending requests for the same record
$dupStmt = $conn->prepare(
    "SELECT id FROM delete_requests WHERE target_table = ? AND target_id = ? AND status = 'pending'"
);
$dupStmt->bind_param('si', $table, $targetId);
$dupStmt->execute();
if ($dupStmt->get_result()->num_rows > 0) {
    send_json(['success' => false, 'message' => 'A delete request for this record is already pending.'], 409);
}
$dupStmt->close();

$insertStmt = $conn->prepare(
    'INSERT INTO delete_requests (target_table, target_id, reason, status, requested_by)
     VALUES (?, ?, ?, "pending", ?)'
);
$insertStmt->bind_param('sisi', $table, $targetId, $reason, $adminId);

if ($insertStmt->execute()) {
    $requestId = $conn->insert_id;

    // Log it for the History view — tagged with admin ID and record ID
    $logStmt = $conn->prepare(
        "INSERT INTO admin_action_log (admin_id, action, target_table, target_id, delete_request_id, details)
         VALUES (?, 'delete_requested', ?, ?, ?, ?)"
    );
    $details = $admin['name'] . " requested deletion of $table #$targetId";
    $logStmt->bind_param('isiis', $adminId, $table, $targetId, $requestId, $details);
    $logStmt->execute();
    $logStmt->close();

    send_json([
        'success' => true,
        'message' => 'Delete request submitted for Super Admin review.',
        'requestId' => $requestId,
    ]);
} else {
    send_json(['success' => false, 'message' => 'Failed to submit delete request: ' . $insertStmt->error], 500);
}

$insertStmt->close();
$conn->close();
