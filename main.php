<?php
include 'includes/db_connection.php';

$sql = "SELECT * FROM items";
$stmt = $conn->query($sql);
$items = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resto</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <!-- Sección izquierda: Opciones -->
            <div class="col-md-3 border-end" id="sidebar">
                <h4 class="mt-3">Opciones</h4>
                <ul class="list-group">
                    <li class="list-group-item" onclick="showProducts()">Productos</li>
                    <li class="list-group-item" onclick="showPedidos()">Pedidos</li>
                </ul>
            </div>

            <!-- Sección central: Lista de productos -->
            <div class="col-md-9" id="content">
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <h4>Lista de Productos</h4>
                    <button class="btn btn-primary" onclick="showAddForm()">Agregar Producto</button>
                </div>
                <div id="productsList" class="mt-3">
                    <!-- Aquí se cargan dinámicamente los productos -->
                </div>
            </div>

            <!-- Sección derecha: Formulario dinámico (oculto por defecto) -->
            <div class="col-md-3 border-start d-none" id="formSection">
                <h4 class="mt-3">Formulario</h4>
                <div id="dynamicForm">
                    <!-- El formulario dinámico se cargará aquí -->
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
    <!-- JQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- Archivo JS -->
    <script src="js/scripts.js"></script>
</body>
</html>
