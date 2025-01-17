<?php
$host = "localhost";
$user = "root";
$password = ""; // Cambia si configuraste una contraseña en MySQL
$dbname = "comandas_db"; // Cambia al nombre de tu base de datos

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error en la conexión: " . $e->getMessage();
}
