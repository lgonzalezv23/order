<?php
include 'includes/db_connection.php';

// Consultar productos junto con sus categorías
$sql = "SELECT items.*, categorias.nombre AS categoria 
        FROM items 
        INNER JOIN categorias ON items.categoria_id = categorias.id";
$stmt = $conn->query($sql);
$items = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (count($items) > 0) {
    foreach ($items as $item) {
        // Definir una imagen por defecto si no hay imagen disponible
        $imagen = !empty($item['imagen']) ? $item['imagen'] : 'img/default.png';
        
        echo "
<section class='product' onclick='editProduct({$item['id']})' style='cursor: pointer;'>
    <div class='product__photo'>
        <div class='photo-container'>
            <div class='photo-main'>
                <img src='$imagen' alt='" . htmlspecialchars($item['nombre']) . "'>
            </div>
        </div>
    </div>
    <div class='product__info'>
        <div class='title'>
            <h1>" . htmlspecialchars(ucfirst($item['nombre'])) . "</h1>
            <span>Categoría: " . htmlspecialchars(ucfirst($item['categoria'])) . "</span>
        </div>
        <div class='price'>
            $ <span>" . number_format($item['precio'], 2) . "</span>
        </div>
        <button class='btn btn-danger btn-sm delete-btn' onclick='event.stopPropagation(); deleteProduct({$item['id']})'>Eliminar</button>
    </div>
</section>";

        
    }
} else {
    echo "<p>No hay productos disponibles.</p>";
}
?>
