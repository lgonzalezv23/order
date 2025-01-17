<?php
include 'includes/db_connection.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $imagen = !empty($product['imagen']) ? $product['imagen'] : 'img/default.png';
    $product['imagen'] = $imagen;

    $sql = "SELECT items.*, categorias.id AS categoria_id, categorias.nombre AS categoria_nombre 
            FROM items 
            INNER JOIN categorias ON items.categoria_id = categorias.id 
            WHERE items.id = :id";

    $stmt = $conn->prepare($sql);
    $stmt->execute(['id' => $id]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($product) {
        echo json_encode($product);
    } else {
        echo json_encode(["error" => "Producto no encontrado."]);
    }
} else {
    echo json_encode(["error" => "ID no especificado."]);
}
?>
