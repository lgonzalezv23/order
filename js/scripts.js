// Función para mostrar el formulario de agregar producto
function showAddForm() {
    const formHtml = `
        <h5 class="mt-3">Agregar Producto</h5>
        <form id="addProductForm">
            <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre" name="nombre" required>
            </div>
            <div class="mb-3">
                <label for="precio" class="form-label">Precio</label>
                <input type="number" class="form-control" id="precio" name="precio" step="0.01" required>
            </div>
            <div class="mb-3">
                <label for="imagen" class="form-label">Imagen</label>
                <input type="file" class="form-control" id="imagen" name="imagen" accept="image/*">
            </div>
            <button type="submit" class="btn btn-success">Guardar</button>
        </form>
    `;

    // Mostrar el formulario en el lado derecho
    $("#dynamicForm").html(formHtml);
    $("#formSection").removeClass("d-none");

    // Reducir la sección central para dar espacio al formulario
    $("#content").removeClass("col-md-9").addClass("col-md-6");

    // Manejar el envío del formulario
    $("#addProductForm").on("submit", function(e) {
        e.preventDefault();
        const formData = new FormData(this);

        $.ajax({
            url: "procesar_item.php",
            method: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                alert(response);
                showProducts(); // Recargar la lista de productos
                hideForm(); // Ocultar el formulario nuevamente
            },
            error: function() {
                alert("Error al agregar el producto.");
            }
        });
    });
}

// Función para ocultar el formulario
function hideForm() {
    $("#formSection").addClass("d-none"); // Ocultar el formulario
    $("#content").removeClass("col-md-6").addClass("col-md-9"); // Expandir la sección central
    $("#dynamicForm").html(""); // Limpiar el formulario
}

// Función para mostrar los productos
function showProducts() {
    $.ajax({
        url: "load_products.php",
        method: "GET",
        success: function(data) {
            $("#productsList").html(data);
        },
        error: function() {
            alert("Error al cargar los productos.");
        }
    });
}

// Función para manejar la opción "Pedidos" (aún sin funcionalidad)
function showPedidos() {
    alert("La funcionalidad de pedidos aún no está implementada.");
}

// Cargar los productos al inicio
$(document).ready(function() {
    showProducts();
});

function editProduct(id) {
    $.ajax({
        url: "get_product.php",
        method: "GET",
        data: { id },
        success: function(response) {
            console.log("Respuesta del servidor:", response); // Depuración

            // El JSON ya es válido, no necesitas parsearlo manualmente
            const product = response;

            // Construir el formulario con los datos recibidos
            const formHtml = `
                <h5 class="mt-3">Editar Producto</h5>
                <form id="editProductForm">
                    <input type="hidden" name="id" value="${product.id}">
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="nombre" name="nombre" value="${product.nombre}" required>
                    </div>
                    <div class="mb-3">
                        <label for="precio" class="form-label">Precio</label>
                        <input type="number" class="form-control" id="precio" name="precio" value="${product.precio}" step="0.01" required>
                    </div>
                    <div class="mb-3">
                        <label for="imagen" class="form-label">Imagen</label>
                        <input type="file" class="form-control" id="imagen" name="imagen" accept="image/*">
                    </div>
                    <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                </form>
            `;

            // Mostrar el formulario en el lado derecho
            $("#dynamicForm").html(formHtml);
            $("#formSection").removeClass("d-none");
            $("#content").removeClass("col-md-9").addClass("col-md-6");

            // Manejar el envío del formulario de edición
            $("#editProductForm").on("submit", function(e) {
                e.preventDefault();
                const formData = new FormData(this);

                $.ajax({
                    url: "update_product.php",
                    method: "POST",
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function(response) {
                        alert(response);
                        showProducts(); // Recargar la lista de productos
                        hideForm(); // Ocultar el formulario
                    },
                    error: function() {
                        alert("Error al actualizar el producto.");
                    }
                });
            });
        },
        error: function() {
            alert("Error al cargar los datos del producto.");
        }
    });
}

// Función para eliminar un producto
function deleteProduct(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        $.ajax({
            url: "delete_product.php",
            method: "POST",
            data: { id },
            success: function(response) {
                alert(response); // Mostrar mensaje del servidor
                showProducts(); // Recargar la lista de productos
            },
            error: function() {
                alert("Error al intentar eliminar el producto.");
            }
        });
    }
}
