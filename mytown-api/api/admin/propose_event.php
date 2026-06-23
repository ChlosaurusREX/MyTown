<?php
/**
 * admin/propose_event.php — POST { adminId, name, category, event_date, location, price, tickets_total }
 *
 * Any admin (including super_admin) can propose a new event.
 * For regular admins, the proposal goes into event_proposals with status='pending'.
 * Super admins can also propose, but their proposals are auto-approved.
 *
 * Requires the event_proposals table (see SQL patch below).
 */
require_once __DIR__ . '/../db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(['success' => false, 'message' => 'Method not allowed'], 405);
}

$body   = get_json_body();
$adminId = (int)($body['adminId'] ?? 0);
$name    = trim($body['name']       ?? '');
$category= trim($body['category']   ?? '');
$date    = trim($body['event_date'] ?? '');
$location= trim($body['location']   ?? '');
$price   = (float)($body['price']        ?? 0);
$total   = (int)($body['tickets_total']  ?? 0);
$notes   = trim($body['notes']      ?? '');

if ($adminId <= 0 || $name === '' || $category === '' || $date === '' || $location === '' || $total <= 0) {
    send_json(['success' => false, 'message' => 'All fields are required.'], 400);
}

// Verify admin exists
$adminStmt = $conn->prepare('SELECT id, name, role FROM admin_users WHERE id = ?');
$adminStmt->bind_param('i', $adminId);
$adminStmt->execute();
$adminRes = $adminStmt->get_result();
if ($adminRes->num_rows === 0) {
    send_json(['success' => false, 'message' => 'Admin account not found.'], 404);
}
$admin = $adminRes->fetch_assoc();
$adminStmt->close();

// Super admins: auto-approve (insert directly into events)
if ($admin['role'] === 'super_admin') {
    $ins = $conn->prepare(
        'INSERT INTO events (name, category, event_date, location, price, tickets_total, tickets_remaining)
         VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    $ins->bind_param('ssssdii', $name, $category, $date, $location, $price, $total, $total);
    if (!$ins->execute()) {
        send_json(['success' => false, 'message' => 'Failed to create event: ' . $conn->error], 500);
    }
    $newId = $conn->insert_id;
    $ins->close();

    // Log it
    $action  = 'event_created';
    $details = $admin['name'] . " created event #$newId '$name' (auto-approved as super admin)";
    $logStmt = $conn->prepare(
        "INSERT INTO admin_action_log (admin_id, action, target_table, target_id, details) VALUES (?, ?, 'events', ?, ?)"
    );
    $logStmt->bind_param('isis', $adminId, $action, $newId, $details);
    $logStmt->execute();
    $logStmt->close();

    send_json(['success' => true, 'message' => 'Event created successfully.', 'event_id' => $newId]);
} else {
    // Regular admin: insert proposal, needs super admin approval
    $ins = $conn->prepare(
        'INSERT INTO event_proposals (proposed_by, name, category, event_date, location, price, tickets_total, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $ins->bind_param('issssdis', $adminId, $name, $category, $date, $location, $price, $total, $notes);
    if (!$ins->execute()) {
        send_json(['success' => false, 'message' => 'Failed to submit proposal: ' . $conn->error], 500);
    }
    $proposalId = $conn->insert_id;
    $ins->close();

    // Log it
    $action  = 'event_proposed';
    $details = $admin['name'] . " proposed new event '$name' (proposal #$proposalId)";
    $logStmt = $conn->prepare(
        "INSERT INTO admin_action_log (admin_id, action, target_table, target_id, details) VALUES (?, ?, 'events', ?, ?)"
    );
    $logStmt->bind_param('isis', $adminId, $action, $proposalId, $details);
    $logStmt->execute();
    $logStmt->close();

    send_json(['success' => true, 'message' => 'Event proposal submitted for super admin approval.', 'proposal_id' => $proposalId]);
}

$conn->close();
