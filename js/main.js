/** CLASE PRODUCTO: Para crear objetos con priopiedades claras (Escalabilidad) */
class Producto{
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
    }
}

// 1. ESTADO
let carrito = JSON.parse(localStorage.getItem("CARRITO_KEY")) || [];
let catalogoBase = [];

// 2. SELECTORES
const contenedorCards = document.getElementById("contenedor-cards");
const contenedorCarrito = document.getElementById("carrito-items");
const totalDisplay = document.getElementById("total-precio");
const formProducto = document.getElementById("form-producto");
const btnVaciar = document.getElementById("btn-vaciar");
const btnComprar = document.getElementById("btn-comprar");
const notificacion = document.getElementById("mensaje-usuario");

// 3. FUNCIONES
async function cargarProductos() {
    try {
        const response = await fetch('./json/productos.json');
        catalogoBase = await response.json();
        mostrarCatalogo(catalogoBase);
    } catch (error) {
        console.error("Error al cargar JSON:", error);
    }
}

function mostrarCatalogo(lista) {
    contenedorCards.innerHTML = "";
    lista.forEach(prod => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <h4>${prod.nombre}</h4>
            <p>$${prod.precio.toLocaleString()}</p>
            <button id="btn-add-${prod.id}">Agregar</button>
        `;
        contenedorCards.appendChild(div);
        document.getElementById(`btn-add-${prod.id}`).addEventListener("click", () => agregarAlCarrito(prod));
    });
}

function renderizarCarrito() {
    contenedorCarrito.innerHTML = "";
    let acumulador = 0;

    carrito.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "item-carrito";
        div.innerHTML = `
        <span>${item.nombre}</span>
        <strong>$${item.precio.toLocaleString()}</strong>
        `;
        contenedorCarrito.appendChild(div);
        acumulador += item.precio;
    });

    totalDisplay.innerText = `$${acumulador.toLocaleString()}`;
    localStorage.setItem("CARRITO_KEY", JSON.stringify(carrito));
}

// 4. LOGICA DE PROCESAMIENTO (Algoritmos)
function agregarAlCarrito(producto) {
    carrito.push(producto);
    mostrarFeedback(`Agregado: ${producto.nombre}`);
    renderizarCarrito();
}

function mostrarFeedback(mensaje) {
    notificacion.innerText = mensaje;
    notificacion.style.display = "block";
    setTimeout(() => { notificacion.style.display = "none"; }, 2000);
}

// 5. EVENTOS (Interactividad)
formProducto.addEventListener("submit", (e) => {
    e.preventDefault();

    // Captura de datos desde inputs
    const nombre = document.getElementById("nombre-input").value;
    const precio = document.getElementById("precio-input").value;

    const nuevoProd = new Producto(Date.now(), nombre, precio);
    agregarAlCarrito(nuevoProd);

    formProducto.reset(); //Limpieza de campos
});

btnVaciar.addEventListener("click", () => {
    carrito = [];
    localStorage.removeItem("CARRITO_KEY");
    renderizarCarrito();
    mostrarFeedback("Carrito vaciado");
});


btnComprar.addEventListener("click", () => {
    if (carrito.length > 0) {
        mostrarFeedback("¡Gracias por tu compra! Procesando...");
        carrito = [];
        localStorage.removeItem("CARRITO_KEY");
        renderizarCarrito();
    } else {
        mostrarFeedback("El carrito está vacío");
    }
});
//INICIALIZACION
cargarProductos();
renderizarCarrito()