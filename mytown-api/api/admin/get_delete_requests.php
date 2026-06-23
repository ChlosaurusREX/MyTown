<?php
/**
 * admin/get_delete_requests.php — GET ?status=pending|approved|rejected|all
 *
 * Returns delete requests, joined with the requesting/resolving admin's
 * name, for display in the Super Admin "Pending Approvals" queue and
 * in the resolved history.
 */
require_once __DIR__ . '/../db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    send_json(['success' => false, 'message' => 'Method not allowed'], 405);
}

$status = $_GET['status'] ?? 'pending';
$allowed = ['pending', 'approved', 'rejected', 'all'];
if (!in_array($status, $allowed, true)) {
    send_json(['success' => false, 'message' => 'Invalid status filter.'], 400);
}

$sql = "SELECT dr.id, dr.target_table, dr.target_id, dr.reason, dr.status,
               dr.requested_by, req.name AS requested_by_name,
               dr.requested_at,
               dr.resolved_by, res.name AS resolved_by_name,
               dr.resolved_at
        FROM delete_requests dr
        JOIN admin_users req ON req.id = dr.requested_by
        LEFT JOIN admin_users res ON res.id = dr.resolved_by";

if ($status !== 'all') {
    $sql .= " WHERE dr.status = ?";
}
$sql .= " ORDER BY dr.requested_at DESC";

$stmt = $conn->prepare($sql);
if ($status !== 'all') {
    $stmt->bind_param('s', $status);
}
$stmt->execute();
$result = $stmt->get_result();

$requests = [];
while ($row = $result->fetch_assoc()) {
    $row['id'] = (int)$row['id'];
    $row['target_id'] = (int)$row['target_id'];
    $row['requested_by'] = (int)$row['requested_by'];
    $row['resolved_by'] = $row['resolved_by'] !== null ? (int)$row['resolved_by'] : null;
    $requests[] = $row;
}

send_json(['success' => true, 'requests' => $requests]);

$stmt->close();
$conn->close();
