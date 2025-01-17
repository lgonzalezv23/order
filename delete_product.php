<?php
include 'includes/db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['id'])) {
        $id = $_POST['id'];

        // Eliminar el producto de la base de datos
        $sql = "DELETE FROM items WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->execute(['id' => $id]);

        if ($stmt->rowCount() > 0) {
            echo "Producto eliminado correctamente.";
        } else {
            echo "Error: No se encontró el producto.";
        }
    } else {
        echo "Error: ID no proporcionado.";
    }
} else {
    echo "Método no permitido.";
}
?>
