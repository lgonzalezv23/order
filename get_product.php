<?php
include 'includes/db_connection.php';

header('Content-Type: application/json'); // Asegura que la respuesta sea JSON

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $sql = "SELECT * FROM items WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->execute(['id' => $id]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$product) {
        echo json_encode(["error" => "Producto no encontrado"]);
        exit;
    }

    echo json_encode($product);
} else {
    echo json_encode(["error" => "ID no proporcionado"]);
}
