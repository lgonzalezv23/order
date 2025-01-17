<?php
include 'includes/db_connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombre = $_POST['nombre'];
    $precio = $_POST['precio'];
    $categoria_id = $_POST['categoria_id']; // Capturar la categoría

    // Manejo de la imagen
    $ruta_imagen = null;
    if (!empty($_FILES['imagen']['name'])) {
        $carpeta_destino = "img/";
        if (!is_dir($carpeta_destino)) {
            mkdir($carpeta_destino, 0777, true);
        }

        $ruta_imagen = $carpeta_destino . basename($_FILES['imagen']['name']);
        move_uploaded_file($_FILES['imagen']['tmp_name'], $ruta_imagen);
    }

    // Insertar en la base de datos
    $sql = "INSERT INTO items (nombre, precio, categoria_id, imagen) VALUES (:nombre, :precio, :categoria_id, :imagen)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        'nombre' => $nombre,
        'precio' => $precio,
        'categoria_id' => $categoria_id,
        'imagen' => $ruta_imagen
    ]);

    echo "Producto agregado correctamente.";
} else {
    echo "Método no permitido.";
}
?>
