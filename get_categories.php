<?php
include 'includes/db_connection.php';

header('Content-Type: application/json');

$sql = "SELECT * FROM categorias";
$stmt = $conn->query($sql);
$categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($categories);
?>
