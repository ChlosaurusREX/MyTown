<?php
/**
 * admin/get_event_proposals.php — GET ?status=pending|approved|rejected|all
 *
 * Returns event proposals for the super admin to review.
 */
require_once __DIR__ . '/../db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    send_json(['success' => false, 'message' => 'Method not allowed'], 405);
}

$status = $_GET['status'] ?? 'pending';
$allowed = ['pending', 'approved', 'rejected', 'all'];
if (!in_array($status, $allowed, true)) {
    send_json(['success' => false, 'message' => 'Invalid status.'], 400);
}

$where = $status === 'all' ? '' : "WHERE ep.status = '$status'";

$sql = "
    SELECT ep.id, ep.name, ep.category, ep.event_date, ep.location,
           ep.price, ep.tickets_total, ep.notes, ep.status,
           ep.proposed_by, a.name AS proposed_by_name,
           ep.reviewed_by, ra.name AS reviewed_by_name,
           ep.created_at, ep.reviewed_at
    FROM event_proposals ep
    JOIN admin_users a ON a.id = ep.proposed_by
    LEFT JOIN admin_users ra ON ra.id = ep.reviewed_by
    $where
    ORDER BY ep.created_at DESC
";

$result = $conn->query($sql);
if (!$result) {
    send_json(['success' => false, 'message' => 'Query failed: ' . $conn->error], 500);
}

$proposals = [];
while ($r = $result->fetch_assoc()) {
    $r['id']           = (int)$r['id'];
    $r['proposed_by']  = (int)$r['proposed_by'];
    $r['reviewed_by']  = $r['reviewed_by'] ? (int)$r['reviewed_by'] : null;
    $r['price']        = (float)$r['price'];
    $r['tickets_total']= (int)$r['tickets_total'];
    $proposals[] = $r;
}

send_json(['success' => true, 'proposals' => $proposals]);

$conn->close();
