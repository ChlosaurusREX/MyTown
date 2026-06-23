<?php
/**
 * admin/resolve_event_proposal.php — POST { adminId, proposalId, decision }
 *   decision: "approve" | "reject"
 *
 * Only super_admin can resolve proposals.
 * On approval, the event is inserted into the events table.
 */
require_once __DIR__ . '/../db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(['success' => false, 'message' => 'Method not allowed'], 405);
}

$body       = get_json_body();
$adminId    = (int)($body['adminId']    ?? 0);
$proposalId = (int)($body['proposalId'] ?? 0);
$decision   = $body['decision'] ?? '';

if ($adminId <= 0 || $proposalId <= 0 || !in_array($decision, ['approve', 'reject'], true)) {
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
    send_json(['success' => false, 'message' => 'Only a Super Admin can resolve event proposals.'], 403);
}

// Load the proposal
$pStmt = $conn->prepare('SELECT * FROM event_proposals WHERE id = ?');
$pStmt->bind_param('i', $proposalId);
$pStmt->execute();
$pRes = $pStmt->get_result();
if ($pRes->num_rows === 0) {
    send_json(['success' => false, 'message' => 'Proposal not found.'], 404);
}
$p = $pRes->fetch_assoc();
$pStmt->close();

if ($p['status'] !== 'pending') {
    send_json(['success' => false, 'message' => 'This proposal has already been resolved.'], 409);
}

$conn->begin_transaction();

$newStatus = $decision === 'approve' ? 'approved' : 'rejected';
$updStmt = $conn->prepare(
    'UPDATE event_proposals SET status = ?, reviewed_by = ?, reviewed_at = NOW() WHERE id = ?'
);
$updStmt->bind_param('sii', $newStatus, $adminId, $proposalId);
$updStmt->execute();
$updStmt->close();

$newEventId = null;
if ($decision === 'approve') {
    $ins = $conn->prepare(
        'INSERT INTO events (name, category, event_date, location, price, tickets_total, tickets_remaining)
         VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    $remaining = (int)$p['tickets_total'];
    $ins->bind_param(
        'ssssdii',
        $p['name'], $p['category'], $p['event_date'], $p['location'],
        $p['price'], $p['tickets_total'], $remaining
    );
    $ins->execute();
    $newEventId = $conn->insert_id;
    $ins->close();
}

// Log
$action  = $decision === 'approve' ? 'proposal_approved' : 'proposal_rejected';
$details = $admin['name'] . " {$decision}d event proposal #{$proposalId} '{$p['name']}'";
if ($newEventId) $details .= " → new event #{$newEventId}";
$logStmt = $conn->prepare(
    "INSERT INTO admin_action_log (admin_id, action, target_table, target_id, details) VALUES (?, ?, 'events', ?, ?)"
);
$logStmt->bind_param('isis', $adminId, $action, $proposalId, $details);
$logStmt->execute();
$logStmt->close();

$conn->commit();

send_json([
    'success'  => true,
    'message'  => $decision === 'approve'
        ? "Event approved and published successfully."
        : "Event proposal rejected.",
    'event_id' => $newEventId,
]);

$conn->close();
