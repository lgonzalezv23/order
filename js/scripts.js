function showAddForm() {
    console.log("showAddForm fue llamado"); // Depuración
    $.ajax({
        url: "get_categories.php",
        method: "GET",
        success: function(categories) {
            console.log("Categorías cargadas:", categories); // Depuración
            const categoryOptions = categories.map(cat => `<option value="${cat.id}">${cat.nombre}</option>`).join("");
            
            // Crear el formulario dinámico
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
                        <label for="categoria_id" class="form-label">Categoría</label>
                        <select class="form-control" id="categoria_id" name="categoria_id" required>
                            ${categoryOptions}
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="imagen" class="form-label">Imagen</label>
                        <input type="file" class="form-control" id="imagen" name="imagen" accept="image/*">
                    </div>
                    <button type="submit" class="btn btn-success">Guardar</button>
                </form>
            `;

            $("#dynamicForm").html(formHtml);
            $("#formSection").removeClass("d-none");
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
                        hideForm(); // Ocultar el formulario
                    },
                    error: function() {
                        alert("Error al agregar el producto.");
                    }
                });
            });
        },
        error: function() {
            alert("Error al cargar las categorías.");
        }
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

            const product = JSON.parse(response); // Aseguramos que se parsee correctamente

            // Obtener las categorías disponibles
            $.ajax({
                url: "get_categories.php",
                method: "GET",
                success: function(categories) {
                    console.log("Categorías cargadas:", categories); // Depuración

                    const categoryOptions = categories.map(cat => `
                        <option value="${cat.id}" ${cat.id == product.categoria_id ? "selected" : ""}>
                            ${cat.nombre}
                        </option>
                    `).join("");

                    const formHtml = `
                        <h5 class="mt-3">Editar Producto</h5>
                        <form id="editProductForm">
                            <input type="hidden" name="id" value="${product.id}">
                            <div class="mb-3">
                                <label for="nombre" class="form-label">Nombre</label>
                                <input type="text" class="form-control" id="nombre" name="nombre" value="${product.nombre || ''}" required>
                            </div>
                            <div class="mb-3">
                                <label for="precio" class="form-label">Precio</label>
                                <input type="number" class="form-control" id="precio" name="precio" value="${product.precio || ''}" step="0.01" required>
                            </div>
                            <div class="mb-3">
                                <label for="categoria_id" class="form-label">Categoría</label>
                                <select class="form-control" id="categoria_id" name="categoria_id" required>
                                    ${categoryOptions}
                                </select>
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
                    alert("Error al cargar las categorías.");
                }
            });
        },
        error: function() {
            alert("Error al cargar los datos del producto.");
        }
    });
}

function deleteProduct(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        $.ajax({
            url: "delete_product.php",
            method: "POST",
            data: { id: id },
            success: function(response) {
                alert(response);
                showProducts(); // Recargar la lista de productos después de eliminar
            },
            error: function() {
                alert("Error al eliminar el producto.");
            }
        });
    }
}
