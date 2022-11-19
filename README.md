# terceraEntregaJS


total -= prod.cantidad*prod.precio
    crearli.innerHTML = `<p id= "total">Total: $${total}</p>
                        <button class= "btn btn-primary" id= "finCompra">Finalizar Compra</button>`
    let liCarrito = document.getElementById(`liCarrito${prod.id}`)
    liCarrito.remove()
    arreglo.length == 1 ? arreglo.splice(0, 1) : arreglo.splice(arreglo.indexOf(prod), 1)
    arreglo.length == 0 ? localStorage.removeItem('carrito') : localStorage.setItem('carrito', JSON.stringify(arreglo))
    mostrarCards(verduras)
    mostrarCarrito(arreglo)


let productoEliminar = array.find(libro => libro.id == productoCarrito.id)
let posicion = array.indexof(productoeliminar)
array.splice(posicion,1)


borrar los productos del carrito del reicen comprado