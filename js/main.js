// CONSTANTE
const MAX_PRODUCTOS = 5;

// ARRAY
let listaCompras = [];

// VARIABLE
let continuar = true;


// FUNCION PRINCIPAL
function IniciarPrograma() {

    alert("Bienvenido a tu lista de compras");

    while (continuar && listaCompras.length < MAX_PRODUCTOS) {

        let producto = prompt("Ingrese un producto para la lista:");

        if (producto === null || producto === "") {
            alert("No ingresaste ningún producto");
        } else {

            listaCompras.push(producto);

            console.log("Producto agregado:", producto);
            alert("Producto agregado correctamente");

        }

        continuar = confirm("¿Querés agregar otro producto?");
    }

    mostrarLista();
}



// FUNCION PARA MOSTRAR LISTA
function mostrarLista() {

    alert("Mostrando lista en consola");

    console.log("----- LISTA DE COMPRAS -----");

    // CICLO DE ITERACION
    for (let i = 0; i < listaCompras.length; i++) {

        console.log((i + 1) + " - " + listaCompras[i]);

    }

    console.log("Total de productos:", listaCompras.length);

    alert("Revisá la consola para ver la lista completa");
}