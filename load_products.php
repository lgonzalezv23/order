<?php
include 'includes/db_connection.php';

$sql = "SELECT * FROM items";
$stmt = $conn->query($sql);
$items = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($items) {
    foreach ($items as $item) {
        echo "<div class='card mb-3'>
                <div class='row g-0'>
                    <div class='col-md-4'>
                        <img src='{$item['imagen']}' class='img-fluid' alt='{$item['nombre']}'>
                    </div>
                    <div class='col-md-8'>
                        <div class='card-body'>
                            <h5>{$item['nombre']}</h5>
                            <p>Precio: {$item['precio']}</p>
                        </div>
                    </div>
                </div>
            </div>";
    }
} else {
    echo "<p>No hay productos disponibles.</p>";
}
?>
