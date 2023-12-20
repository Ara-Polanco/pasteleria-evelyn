const carrito = document.querySelector('#carrito__contenido') /* Contenedor de nuestro carrito */
const contenedorCarrito = document.querySelector('#lista-carrito tbody') /* Contiene los elementos del tbody */
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaProductos = document.querySelector('#productos__categoria') /* Contenedor de todos los productos */
let productosCarrito = []   /* Nuestro carrito de compras vacío */

cargarEventListeners()
function cargarEventListeners() {
    /* Cuando agregas un producto presionando "Comprar" */
    listaProductos.addEventListener('click', agregarProducto)

    /* Elimina el producto del carrito */
    carrito.addEventListener('click', eliminarProducto)

    /* Mostrar los productos del local storage */
    document.addEventListener('DOMContentLoaded', () => {
        productosCarrito = JSON.parse( localStorage.getItem('carrito') ) || []

        carritoHTML()
    })

    /* Vaciar el carrito de compras */
    vaciarCarritoBtn.addEventListener('click', () => {
        productosCarrito = []   /* Reseteamos el arreglo */
        limpiarHTML() /* Eliminamos el HTML */
    })
}


/* Funciones */
function agregarProducto(e) {
    if( e.target.classList.contains('productos__btn') ){
        const productoSeleccionado = e.target.parentElement.parentElement

        leerDatosProducto(productoSeleccionado)
    }
}

/* Extraer la informacion de la card  */
function leerDatosProducto(productoSeleccionado) {

    /* Creamos un objeto con el contenido del producto actual */
    const infoProducto = {
        imagen: productoSeleccionado.querySelector('img').src,
        titulo: productoSeleccionado.querySelector('.productos__nombre').textContent,
        precio: productoSeleccionado.querySelector('.productos__cantidad').textContent,
        id: productoSeleccionado.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }
    /* Verificar si el producto ya existe en el carrito de compras */
    const existe = productosCarrito.some( producto => producto.id === infoProducto.id)
    if(existe) {
        /* Solo actualizamos la cantidad */
        const productos = productosCarrito.map( producto => {
            if( producto.id === infoProducto.id ) {
             
                producto.cantidad++
                producto.precio = parseInt(infoProducto.precio)
                producto.precio = producto.precio * producto.cantidad
                return producto     /* Devuelve el producto del carrito con la cantidad actualizada */
            } else {
                return producto /* Devuelve los demas elementos del carrito que no han sido duplicados */
            }
        })

        productosCarrito = [...productos]
    } else {
        /* Agregamos el producto al carrito */
        productosCarrito = [...productosCarrito, infoProducto]
    }

    carritoHTML()
}

/* Mostrar el carrito de compras en el HTML */
function carritoHTML(){

    /* Limpiar el HTML */
    limpiarHTML()

    /* Recorre el carrito y genera el HTML */
    productosCarrito.forEach( (producto) => {
        const { imagen, titulo, precio, cantidad, id} = producto
        const row = document.createElement('TR')
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo} 
            </td>
            <td>
                ${precio} 
            </td>
            <td>
                ${cantidad} 
            </td>
            <td>
                <a href="#" class="eliminar-producto"  data-id="${id}" >X </a>
                
            </td>
            `
        /* Agregando el HTML en el Tbody */
        contenedorCarrito.appendChild(row)
    })

    /* Agregando el carrito de compras al storage */
    sincronizarStorage()
}

/* Borrar los productos del Tbody */
function limpiarHTML() {
    /* Mienras exista un elemento hijo en el contenedor padre, se borrará el primer hijo mientras sigan existiendo */
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

    /* Opción no optimizada */
/*     contenedorCarrito.innerHTML = '' */
}

/* Elimina el producto del carrito */
function eliminarProducto(e) {
    if(e.target.classList.contains('eliminar-producto')) {
        const productoId = e.target.getAttribute('data-id') 

        /* Eliminamos del arreglo productosCarrito segun su data-id */
        productosCarrito.forEach( producto => {
            if(productoId === producto.id) {
                /* Si existe mas de un producto en el carrito, le eliminamos una unidad */
                if(producto.cantidad > 1) {
                    let precioUnitario = producto.precio / producto.cantidad

                    producto.cantidad--

                    producto.precio = precioUnitario * producto.cantidad
                } else {
                    /* Si no existe mas de 1 unidad, se elimina el prodcuto por completo */
                    productosCarrito = productosCarrito.filter( producto => producto.id !== productoId)
                }
            }
        })
        carritoHTML()  /* Iteramos sobre el carrito con los productos ya eliminados */
    }
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(productosCarrito))
}