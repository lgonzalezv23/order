<?php
include 'includes/db_connection.php';

$sql = "SELECT * FROM items";
$stmt = $conn->query($sql);
$items = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (count($items) > 0) {
    foreach ($items as $item) {
        echo "
        <div class='card mb-3'>
            <div class='row g-0'>
                <div class='col-md-4'>
                    <img src='{$item['imagen']}' class='img-fluid rounded-start' alt='{$item['nombre']}'>
                </div>
                <div class='col-md-8'>
                    <div class='card-body'>
                        <div class='d-flex justify-content-between'>
                            <h5 class='card-title'>{$item['nombre']}</h5>
                            <button class='btn btn-danger btn-sm' onclick='deleteProduct({$item['id']})'>Eliminar</button>
                        </div>
                        <p class='card-text'>Precio: $ {$item['precio']}</p>
                    </div>
                </div>
            </div>
        </div>";
    }
} else {
    echo "<p>No hay productos disponibles.</p>";
}
?>
