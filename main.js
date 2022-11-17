
/*DOM */
const cards = document.getElementById (`cards`)
const cardTemplate = document.getElementById (`templateCard`).content
const fragment = document.createDocumentFragment()
const templateFooter = document.getElementById ("template-footer").content
const templateCarrito = document.getElementById (`template-carrito`).content
const items = document.getElementById (`items`)
const footer = document.getElementById (`footer`)
let carrito = {}
/**EVENTOS */

//se ejecuta cuando todo el documento HTML fue cargado y parseado.
document.addEventListener (`DOMContentLoaded`, ()=>{
    fetchData()
    if (localStorage.getItem(`Carrito`)){
        carrito = JSON.parse (localStorage.getItem(`Carrito`))
        pintarCarrito()
    }
})
cards.addEventListener(`click`, e=> {
    agregarAlCarro (e)
})

items.addEventListener (`click`, e=>{
    accionBtn(e)
})


/**FUNCIONES */

//Accedo al archivo json mediante Fetch:
const fetchData = async () => {
    try {

        const respuesta = await fetch ("stock.json")
        const arrayDeDatos = await respuesta.json()
        pintarCards (arrayDeDatos)

    } catch (error) {

        console.log (error)

    }
    
}

//Pintar cards
const pintarCards = arrayDeDatos => {
    arrayDeDatos.forEach(elementoEnArray => {
        cardTemplate.querySelector(`h5`).textContent = elementoEnArray.destino
        cardTemplate.querySelector(`p`).textContent = "$" + elementoEnArray.precio
        cardTemplate.querySelector(`.btn-primary`).dataset.id = elementoEnArray.id
        const clon = cardTemplate.cloneNode(true)
        fragment.appendChild(clon)
    });

    cards.appendChild(fragment)
}

//Carrito
const agregarAlCarro = e => {
    // console.log (e.target)
    // console.log (e.target.classList.contains("btn-primary"))
    if (e.target.classList.contains("btn-primary")) {
        setCarrito(e.target.parentElement)
    } 

    e.stopPropagation()
}

//Creo el objeto al apretar "add to cart"
const setCarrito = objeto => {
    // console.log (objeto)
    const viajeData = {
        id: objeto.querySelector(".btn-primary").dataset.id,
        destino: objeto.querySelector("h5").textContent,
        precio: objeto.querySelector(`p`).textContent,
        cantidad:1
    }

    //Compruebo si el elemento ya esta en el carrito o no. Si ya esta, que sume una cantidad
    if(carrito.hasOwnProperty(viajeData.id)) {
        viajeData.cantidad = carrito[viajeData.id].cantidad +1;
    } 
    carrito[viajeData.id] = {...viajeData}
    pintarCarrito()
    
}

const pintarCarrito = () => {
    
    items.innerHTML = ``
    Object.values (carrito).forEach(itemDestino => {
        templateCarrito.querySelector (`th`).textContent = itemDestino.id
        templateCarrito.querySelectorAll (`td`)[0].textContent = itemDestino.destino
        templateCarrito.querySelectorAll (`td`)[1].textContent = itemDestino.cantidad
        templateCarrito.querySelector (`.btn-info`).dataset.id = itemDestino.id
        templateCarrito.querySelector(`.btn-danger`).dataset.id = itemDestino.id
        templateCarrito.querySelector (`span`).textContent = itemDestino.cantidad * itemDestino.precio
    
        const clone = templateCarrito.cloneNode (true)
        fragment.appendChild (clone)
    })
    items.appendChild (fragment)

    pintarFooter ()

    localStorage.setItem(`Carrito`, JSON.stringify(carrito))
}

//Pintar Footer
const pintarFooter = () => {
    footer.innerHTML = ""
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`

    } else {
       const nCantidad = Object.values(carrito).reduce( (acc, {cantidad})=> acc + cantidad ,0 )
       const nPrecio = Object.values (carrito).reduce ( (acc, {cantidad,precio}) => acc + cantidad * precio,0)
       templateFooter.querySelectorAll (`td`)[0].textContent = nCantidad;
       templateFooter.querySelector (`span`).textContent = nPrecio;

       const clone = templateFooter.cloneNode (true)
       fragment.appendChild (clone)
       footer.appendChild(fragment)

       const btnVaciar = document.getElementById (`vaciar-carrito`)
       btnVaciar.addEventListener (`click`, ()=> {
        carrito = {}
        pintarCarrito ()
       })
    }
}

//Accion botones
const accionBtn = (e) => {
    
    //Aumentar 1
    if(e.target.classList.contains(`btn-info`)) {
        // console.log 
        const destinoCantidad = carrito[e.target.dataset.id]
        destinoCantidad.cantidad++
        carrito[e.target.dataset.id] = {...destinoCantidad}
        pintarCarrito()
    }

    if (e.target.classList.contains(`btn-danger`)) {
        const destinoCantidad = carrito[e.target.dataset.id]
        destinoCantidad.cantidad--
        if (destinoCantidad.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito()
    }

    e.stopPropagation()
}