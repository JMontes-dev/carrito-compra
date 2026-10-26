// la Clase Carrito guarda los productos y hace los cálculos
class Carrito {

    constructor(productos) {
        this.productos = productos;

        for (const producto of this.productos) {
            producto.unidades = 0;
        }
    }

    obtenerInformacionProducto(sku) {
        for (const producto of this.productos) {
            if (sku === producto.SKU) {
                return producto;
            }
        }
    }

    actualizarUnidades(sku, unidades) {
        const producto = this.obtenerInformacionProducto(sku);

        producto.unidades = unidades;
    }

    obtenerCarrito() {
        let total = 0;
        let productosCarrito = [];

        for (const producto of this.productos) {
            if (producto.unidades > 0) {
                productosCarrito.push(producto);

                total = total + Number(producto.precio) * producto.unidades;
            }
        }

        return {
            total: total.toFixed(2),
            moneda: "€",
            productos: productosCarrito
        };
    }
}


function mostrarProductos(carrito, moneda) {
    const lista = document.getElementById("lista-productos");

    for (const producto of carrito.productos) {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${Number(producto.precio).toFixed(2)} ${moneda}</td>
            <td>
                <input type="number"
                       class="unidades"
                       data-sku="${producto.SKU}"
                       min="0"
                       step="1"
                       value="0">
            </td>
            <td class="subtotal">0.00 ${moneda}</td>
        `;

        lista.appendChild(fila);
    }

    configurarEventos(carrito, moneda);
}


function configurarEventos(carrito, moneda) {
    const unidades = document.querySelectorAll(".unidades");

    for (const input of unidades) {
        input.addEventListener("change", function() {
            const sku = input.dataset.sku;
            const cantidad = Number(input.value);

            carrito.actualizarUnidades(sku, cantidad);

            const producto = carrito.obtenerInformacionProducto(sku);
            const subtotal = Number(producto.precio) * cantidad;

            input.parentElement.parentElement
                .querySelector(".subtotal").textContent =
                subtotal.toFixed(2) + " " + moneda;

            document.getElementById("total").textContent =
                carrito.obtenerCarrito().total;
        });
    }
}


// API asignada a una variable
const api_productos = "api.php";

async function cargarProductos() {
    const respuesta = await fetch(api_productos);

    if (!respuesta.ok) {
        throw new Error("Error al cargar los productos");
    }

    const datos = await respuesta.json();

    const carrito = new Carrito(datos.productos);

    mostrarProductos(carrito, datos.moneda);
}

cargarProductos();