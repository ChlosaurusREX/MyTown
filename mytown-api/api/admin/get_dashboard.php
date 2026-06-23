<?php
/**
 * admin/get_dashboard.php — GET (no params needed)
 *
 * Returns overview stats:
 *   - total_revenue, total_tickets_sold, total_users, total_events
 *   - ticket_trend (last 7 days, grouped by date)
 *   - events_by_category (count per category, active only)
 *   - top_events (top 5 by tickets sold)
 */
require_once __DIR__ . '/../db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    send_json(['success' => false, 'message' => 'Method not allowed'], 405);
}

// --- Total revenue (from non-deleted tickets) ---
$rev = $conn->query(
    "SELECT COALESCE(SUM(total_price), 0) AS total_revenue FROM tickets WHERE is_deleted = 0"
)->fetch_assoc();

// --- Total tickets sold (quantity sum, non-deleted tickets) ---
$tkts = $conn->query(
    "SELECT COALESCE(SUM(quantity), 0) AS total_sold FROM tickets WHERE is_deleted = 0"
)->fetch_assoc();

// --- Total users (non-deleted) ---
$users = $conn->query(
    "SELECT COUNT(*) AS total_users FROM users WHERE is_deleted = 0"
)->fetch_assoc();

// --- Total active events ---
$evts = $conn->query(
    "SELECT COUNT(*) AS total_events FROM events WHERE is_deleted = 0"
)->fetch_assoc();

// --- Total pending event proposals ---
$proposals = $conn->query(
    "SELECT COUNT(*) AS pending_proposals FROM event_proposals WHERE status = 'pending'"
)->fetch_assoc();

// --- Ticket trend: last 7 days ---
$trend = $conn->query(
    "SELECT DATE(purchased_at) AS day, COALESCE(SUM(quantity), 0) AS sold
     FROM tickets
     WHERE is_deleted = 0
       AND purchased_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
     GROUP BY DATE(purchased_at)
     ORDER BY day ASC"
);
$trendRows = [];
while ($r = $trend->fetch_assoc()) {
    $trendRows[] = ['day' => $r['day'], 'sold' => (int)$r['sold']];
}

// --- Events by category (active only) ---
$catResult = $conn->query(
    "SELECT category, COUNT(*) AS count FROM events WHERE is_deleted = 0 GROUP BY category ORDER BY count DESC"
);
$byCategory = [];
while ($r = $catResult->fetch_assoc()) {
    $byCategory[] = ['category' => $r['category'], 'count' => (int)$r['count']];
}

// --- Top 5 events by tickets sold ---
$topResult = $conn->query(
    "SELECT e.name, COALESCE(SUM(t.quantity), 0) AS sold, COALESCE(SUM(t.total_price), 0) AS revenue
     FROM events e
     LEFT JOIN tickets t ON t.event_id = e.id AND t.is_deleted = 0
     WHERE e.is_deleted = 0
     GROUP BY e.id, e.name
     ORDER BY sold DESC
     LIMIT 5"
);
$topEvents = [];
while ($r = $topResult->fetch_assoc()) {
    $topEvents[] = [
        'name'    => $r['name'],
        'sold'    => (int)$r['sold'],
        'revenue' => (float)$r['revenue'],
    ];
}

send_json([
    'success'           => true,
    'total_revenue'     => (float)$rev['total_revenue'],
    'total_tickets_sold'=> (int)$tkts['total_sold'],
    'total_users'       => (int)$users['total_users'],
    'total_events'      => (int)$evts['total_events'],
    'pending_proposals' => (int)($proposals['pending_proposals'] ?? 0),
    'ticket_trend'      => $trendRows,
    'events_by_category'=> $byCategory,
    'top_events'        => $topEvents,
]);

$conn->close();
