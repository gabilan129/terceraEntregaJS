//todo/ Captura de id
let botonPagar = document.getElementById("botonPago");
let modalBody = document.getElementById("modal-body")
let divCompra = document.getElementById("precioTotal")


//Todo/ Array y objetos

const ArrayGaseosas = [];
const ArrayGalletas = [];
const Arrayfiambres = [];




class Productos {
    constructor(nombre, precio, calorias, tipo, imagen, id) {
        this.nombre = nombre;
        this.precio = parseInt(precio);
        this.calorias = calorias;
        this.tipo = tipo;
        this.vendido = false;
        this.imagen = imagen;
        this.id = id;
    }
}


//Gaseosas  
const productoGaseosa1 = new Productos("cocacola", 320, 840, "gaseosa", "cocacola.jpg", 1);
const productoGaseosa2 = new Productos("coca zero", 320, 0, "gaseosa", "cocazero.jpg", 2);
const productoGaseosa3 = new Productos("pepsi", 230, 700, "gaseosa", "pepsi.jpg", 3);
const productoGaseosa4 = new Productos("manaos", 110, 750, "gaseosa", "manaos.jpg", 4);

ArrayGaseosas.push(productoGaseosa1, productoGaseosa2, productoGaseosa3, productoGaseosa4)
//Galletas
const productoGalleta1 = new Productos("oreo", 130, 800, "galleta", "oreos.jpg", 5);
const productoGalleta2 = new Productos("pepitos", 150, 820, "galleta", "pepitos.jpg", 6);
const productoGalleta3 = new Productos("don satur", 100, 500, "galleta", "donsatur.jpg", 7);
const productoGalleta4 = new Productos("criollitas", 50, 100, "galleta", "criollitas.jpg", 8);

ArrayGalletas.push(productoGalleta1, productoGalleta2, productoGalleta3, productoGalleta4)

//Fiambres
const productosFiambres1 = new Productos("salame", 600, 545, "fiambre", "salame.jpg", 9);
const productosFiambres2 = new Productos("queso", 800, 945, "fiambre", "queso.jpg", 10);
const productosFiambres3 = new Productos("jamon crudo", 900, 1045, "fiambre", "jamoncrudo.jpg", 11);
const productosFiambres4 = new Productos("jamon cocido", 400, 245, "fiambre", "jamoncocido.jpg", 12);

Arrayfiambres.push(productosFiambres1, productosFiambres2, productosFiambres3, productosFiambres4)
ArrayCarrito = ArrayGalletas.concat(ArrayGaseosas, Arrayfiambres)

console.log(ArrayCarrito)

//! si le saco el TRUE : suma todos mete todos los los productos de arraycarrito al array de producto vendido y me acumula el precio desde 0
let productoVendido = ArrayCarrito.filter((pro) => pro.vendido == true)
if (localStorage.getItem("carrito")) {
    productoVendido = JSON.parse(localStorage.getItem("carrito"))
} else {
    console.log("Setea el array del carrito por primera vez")
    localStorage.setItem("carrito", JSON.stringify(productoVendido))
}



let resultado = 0;
let valorConTarjeta = 0;
let pagoTarjeta;

function formaDePagoTarjeta() {


    for (let i = 1; i <= 12; i++) {

        console.log(`el recargo en ${i} cuota es de %${i+3}`)
        valorConTarjeta = resultado * (i + 3);
        valorConTarjeta = valorConTarjeta / 100;
        valorConTarjeta = valorConTarjeta + resultado;
        console.log(valorConTarjeta.toFixed(1));

    }
    
}


//!DOM y EVENTOS


function carts() {


    let productosCart = document.getElementById("productos__cart");

    for (let prod of ArrayCarrito) {
        let productoCompra = document.createElement("div")
        productoCompra.innerHTML = `  <section "> <div class="card " style="width: 18rem;">
        <img src="assets/${prod.imagen}" class="card-img-top" alt="${prod.nombre}">
        <div class="card-body">
        <h5 class="card-title">${prod.nombre}</h5>
                            <p class="card-text">El valor de su producto es de $ ${prod.precio} y contiene ${prod.calorias} calorias</p>
                            <p class="card-text"></p>
                            <button id="boton__${prod.nombre}" class="btn btn-primary">agregar al carrito</button></div>    </div>
                            </div></section> `
        productosCart.appendChild(productoCompra)



        let botonAgregar = document.getElementById(`boton__${prod.nombre}`)

        botonAgregar.addEventListener('click', (e) => {
            e.preventDefault();
            productoVendido.push(prod)
            console.log(productoVendido)
            resultado = productoVendido.reduce((total, producto) => total + producto.precio, 0);
            console.log(`el producto cuesta $ ${prod.precio}`)
            console.log(`agrego ${prod.nombre} su nuevo total a pagar es de $ ${resultado}`)
            localStorage.setItem("carrito", JSON.stringify(productoVendido))

            Toastify({
                text: `Se agrego el producto ${prod.nombre}`,
                className: "info",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                    gravity: "botom"
                }
            }).showToast();
        })





    }


}


botonPagar.addEventListener('click', (e) => {
    e.preventDefault();

    resultado = productoVendido.reduce((total, producto) => total + producto.precio, 0);
    Swal.fire({

        icon: 'success',
        title: 'Su compra fue realizada',
        showConfirmButton: false,
        text: `su total a pagar es de $ ${resultado}`,
        timer: 15000
    })
})




function cargarProductosCarrito(array) {


    modalBody.innerHTML = ""

    array.forEach((productoA1) => {
        modalBody.innerHTML += `
        <div class="card border-primary mb-3" id ="productoVendido${productoA1.id}" style="max-width: 540px;">
            <img class="card-img-top" height="300px" src="assets/${productoA1.imagen}" alt="${productoA1.nombre}">
            <div class="card-body">
                    <h4 class="card-title">${productoA1.nombre}</h4>
                
                    <p class="card-text">$${productoA1.precio}</p> 
                    <button class= "btn btn-danger" id="botonEliminar${productoA1.id}"><i class="fas fa-trash-alt"></i></button>
            </div>    
        </div>
`
    })
    array.forEach((productoA2, indice) => {
        document.getElementById(`botonEliminar${productoA2.id}`).addEventListener("click", () => {
            //!revisar que funciona

            console.log(`Boton eliminar ${productoA2.nombre}`)
            //!Eliminar del DOM
            let cardProducto = document.getElementById(`productoVendido${productoA2.id}`)
            cardProducto.remove()
            //!Eliminar del array de comprar
            array.splice(indice, 1)
            console.log(productoA2)
            //!Eliminar del storage
            localStorage.setItem('carrito', JSON.stringify(array))
            //! Calcular Total

            compraTotal()


        })
        //todo se vuelve a usar la funcion compra total para que se actualize siempre que se sume como que se saque un producto del carrito
        compraTotal()
    })


}


function compraTotal() {
    let totalModal = 0

    totalModal = productoVendido.reduce((total, producto) => total + producto.precio, 0);
    console.log(`MODAL su total a pagar es de $ ${totalModal}`)
    totalModal == 0 ? divCompra.innerHTML = `No hay productos en carrito` : divCompra.innerHTML = `el total a pagar actual es de ${totalModal} `

}
botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(productoVendido)
})



function modoOscuro() {


    //TODO DARK MODE
    let btnDarkMode = document.getElementById("botonDarkMode")
    let btnLightMode = document.getElementById('botonLightMode')





    let modoOscuro



    if (localStorage.getItem("modoOscuro")) {
        modoOscuro = localStorage.getItem("modoOscuro")
    } else {
        console.log("Entro por primera vez")
        localStorage.setItem("modoOscuro", true)
        modoOscuro = "true"
    }
    console.log(modoOscuro)

    if (modoOscuro == "true") {
        document.body.classList.add("darkMode")
    } else {
        document.body.classList.remove("darkMode")
    }
    //Evento darkMode
    btnDarkMode.addEventListener("click", () => {
        document.body.classList.add("darkMode")
        localStorage.setItem("modoOscuro", true)

    })
    btnLightMode.addEventListener("click", () => {
        document.body.classList.remove("darkMode")
        localStorage.setItem("modoOscuro", false)
    })

}

console.log(productoVendido)

modoOscuro()

carts()