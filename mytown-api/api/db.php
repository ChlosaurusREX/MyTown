<?php
/**
 * db.php — shared MySQL connection for the MyTown ticketing API.
 *
 * Default values below match a stock XAMPP install:
 *   host: localhost
 *   user: root
 *   pass: "" (empty)
 *   db:   municipal_tickets
 *
 * If your XAMPP MySQL uses a different user/password, edit the
 * constants below.
 */

// ---- CORS (allows the React dev server / app to call this API) ----
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ---- DB connection settings ----
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'municipal_tickets');

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed: ' . $conn->connect_error,
    ]);
    exit;
}

$conn->set_charset('utf8mb4');

/**
 * Read and decode JSON body sent via fetch().
 */
function get_json_body(): array {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

/**
 * Send a JSON response and stop execution.
 */
function send_json($data, int $statusCode = 200): void {
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}

/*
 * NOTE on passwords:
 * This project currently stores/compares passwords as plain text
 * (per project request, to match the original prototype's simple
 * behavior). To upgrade later:
 *   - In signup.php, replace storing $password directly with:
 *       password_hash($password, PASSWORD_DEFAULT)
 *   - In login.php, replace the "===" password compare with:
 *       password_verify($password, $row['password'])
 */
