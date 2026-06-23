<?php
/**
 * admin/resolve_delete_request.php — POST { adminId, requestId, decision }
 *   decision: "approve" | "reject"
 *
 * Only a 'super_admin' may call this. Approving sets is_deleted = 1 on
 * the target record (soft delete — the row stays in the table, fully
 * reversible by an admin directly in phpMyAdmin if ever needed).
 * Rejecting just closes the request; the record is untouched.
 *
 * Both outcomes are logged to admin_action_log, tagged with the acting
 * Super Admin's ID and the target record's ID.
 */
require_once __DIR__ . '/../db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(['success' => false, 'message' => 'Method not allowed'], 405);
}

$body      = get_json_body();
$adminId   = (int)($body['adminId'] ?? 0);
$requestId = (int)($body['requestId'] ?? 0);
$decision  = $body['decision'] ?? '';

if ($adminId <= 0 || $requestId <= 0 || !in_array($decision, ['approve', 'reject'], true)) {
    send_json(['success' => false, 'message' => 'Missing or invalid request details.'], 400);
}

// Only Super Admins may resolve delete requests
$adminStmt = $conn->prepare('SELECT id, name, role FROM admin_users WHERE id = ?');
$adminStmt->bind_param('i', $adminId);
$adminStmt->execute();
$adminResult = $adminStmt->get_result();
if ($adminResult->num_rows === 0) {
    send_json(['success' => false, 'message' => 'Admin account not found.'], 404);
}
$admin = $adminResult->fetch_assoc();
$adminStmt->close();

if ($admin['role'] !== 'super_admin') {
    send_json(['success' => false, 'message' => 'Only a Super Admin can approve or reject delete requests.'], 403);
}

// Load the pending request
$reqStmt = $conn->prepare(
    "SELECT id, target_table, target_id, status FROM delete_requests WHERE id = ?"
);
$reqStmt->bind_param('i', $requestId);
$reqStmt->execute();
$reqResult = $reqStmt->get_result();
if ($reqResult->num_rows === 0) {
    send_json(['success' => false, 'message' => 'Delete request not found.'], 404);
}
$request = $reqResult->fetch_assoc();
$reqStmt->close();

if ($request['status'] !== 'pending') {
    send_json(['success' => false, 'message' => 'This request has already been resolved.'], 409);
}

$table    = $request['target_table'];
$targetId = (int)$request['target_id'];
$newStatus = $decision === 'approve' ? 'approved' : 'rejected';

$conn->begin_transaction();

// Update the request status
$updateReq = $conn->prepare(
    'UPDATE delete_requests SET status = ?, resolved_by = ?, resolved_at = NOW() WHERE id = ?'
);
$updateReq->bind_param('sii', $newStatus, $adminId, $requestId);
$updateReq->execute();
$updateReq->close();

// If approved, soft-delete the target record
if ($decision === 'approve') {
    $updateTarget = $conn->prepare("UPDATE `$table` SET is_deleted = 1 WHERE id = ?");
    $updateTarget->bind_param('i', $targetId);
    $updateTarget->execute();
    $updateTarget->close();
}

// Log the resolution — tagged with the Super Admin's ID and the record's ID
$action = $decision === 'approve' ? 'delete_approved' : 'delete_rejected';
$details = $admin['name'] . " {$decision}d deletion of $table #$targetId";
$logStmt = $conn->prepare(
    "INSERT INTO admin_action_log (admin_id, action, target_table, target_id, delete_request_id, details)
     VALUES (?, ?, ?, ?, ?, ?)"
);
$logStmt->bind_param('issiis', $adminId, $action, $table, $targetId, $requestId, $details);
$logStmt->execute();
$logStmt->close();

$conn->commit();

send_json([
    'success' => true,
    'message' => $decision === 'approve'
        ? "Record deleted (soft-deleted) successfully."
        : "Delete request rejected. Record was not changed.",
]);

$conn->close();
