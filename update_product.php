<?php
include 'includes/db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $precio = $_POST['precio'];
    $ruta_imagen = null;

    // Manejo de la imagen
    if (!empty($_FILES['imagen']['name'])) {
        $carpeta_destino = "img/";
        $ruta_imagen = $carpeta_destino . basename($_FILES['imagen']['name']);
        move_uploaded_file($_FILES['imagen']['tmp_name'], $ruta_imagen);
    }

    // Actualizar datos en la base de datos
    $sql = "UPDATE items SET nombre = :nombre, precio = :precio" . ($ruta_imagen ? ", imagen = :imagen" : "") . " WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $params = ['nombre' => $nombre, 'precio' => $precio, 'id' => $id];
    if ($ruta_imagen) $params['imagen'] = $ruta_imagen;

    $stmt->execute($params);

    echo "Producto modificado correctamente.";
}
?>
