
/**VARIABLES GLOBALES */

const stock = [
    {
        nombre:"Fideo",
        id:1,
        cantidad:1.
    },
    {
        nombre:"Arroz",
        id:2,
        cantidad:1,
    },
    {
        nombre:"Crema",
        id:3,
        cantidad:1,
    },
]

const productos = document.getElementById(`productos`)
const carritoHTML = document.getElementById (`carrito`)
const vaciarTodoElCarro = document.getElementById (`vaciarCarrito`)

let carrito = [];
localStorage.setItem (`carrito`, JSON.stringify(carrito))


//Crear cada producto en HTML
    stock.forEach ((producto)=>{

        const articleProducto = document.createElement (`article`)
        articleProducto.innerHTML = 
        `
        <div>
            <p>${producto.nombre}</p>
            <p>id: ${producto.id}</p>
            <button id="add${producto.id}">+</button>
        </div>
        `
        productos.append (articleProducto)

        const botonAgregar = document.getElementById (`add${producto.id}`)
        botonAgregar.addEventListener ("click",()=>{
            agregarAlCarrito (producto.id)
        })
        
    })


/**FUNCIONES */

//Agregar al carrito
const agregarAlCarrito = (idProducto) => {

    const itemAgregar = stock.find ((productoEnStock)=> productoEnStock.id === idProducto)

    carrito.push (itemAgregar)

    actualizarCarrito()
}


//Por cada producto en el carrito creo un article en HTML
    function actualizarCarrito () {

        carritoHTML.innerHTML = ""
        let article = "";

        carrito.forEach ((productoEnCarrito)=>{
   
            article+= `
            <div>
                <h3 class="card-title"> ${productoEnCarrito.nombre} </h3>
                <p> id: ${productoEnCarrito.id} </p>
                <p id = "cantidad${productoEnCarrito.cantidad}">Cantidad: ${productoEnCarrito.cantidad} </p>

                <button id = "eliminarDelCarrito${productoEnCarrito.id}" class="btn btn-primary"> Eliminar del Carrito </button>  
                <button id = "sumarUno${productoEnCarrito.id}">+</button>
                <button id = "quitarUno${productoEnCarrito.id}">-</button>
                </div>`

                carritoHTML.innerHTML = article;  

                const botonBorrar = document.getElementById (`eliminarDelCarrito${productoEnCarrito.id}`)
                
                botonBorrar.addEventListener (`click`, ()=> {

                    eliminarDelCarrito (productoEnCarrito.id)

                })
        })
}


//Borrar articulo del carrito:
const eliminarDelCarrito = (idProducto) => {

    const itemBorrar = carrito.find ( (productoEnCarrito)=> productoEnCarrito.id === idProducto)
    
    const indexItem = carrito.indexOf (itemBorrar)
    
    carrito.splice(indexItem,1)

    actualizarCarrito()

}


//Eliminar todo el carrito

const eliminarTodoElCarro = () => {
    carrito.splice (0, carrito.length)
    
    actualizarCarrito()
    console.log (carrito)
}


vaciarTodoElCarro.addEventListener (`click`, eliminarDelCarrito)