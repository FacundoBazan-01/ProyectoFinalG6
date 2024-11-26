document.addEventListener('DOMContentLoaded', function () {
    const url = 'http://localhost:3001/productos';

    const mostrarFavoritos = document.getElementById('listFav');
    const eliminarDiv = document.getElementById('listaFavorito');
    let bandera = 0;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log('Datos recibidos de la API:', data);

            data.forEach(producto => {
                console.log(producto);

                if (producto.productFav === true) {
                    console.log("Producto favorito encontrado:", producto);
                  bandera = 1;
console.log(bandera);
                    // Crear un nuevo div para el producto favorito
                    const card = document.createElement('div');
                    card.classList.add('producto-card');  // Agregar una clase para estilos
                     
                    // Agregar el contenido de la card
                    card.innerHTML = `
                     <div id= "${producto.id}" class="card" style="width: 100%;" >
                     <img class="card-img-top" src="${producto.imagen}" alt="${producto.nombre}">
                     <div class="card-body">
                      <h5 class="card-title">${producto.nombre}</h5>
                     <p class="card-text">$${producto.precio}</p>
                      <div class="div-agregar_eliminar">
                      <button style="box-shadow: none; border: none; background-color: white">
                    <div>
                    <span style="color: #3483fa;">Agregar a carrito</span>
                   </div>
                   </button>
                   <button class= "btnEliminar" style="box-shadow: none; border: none;background-color: white" onclick = "elimFav(${producto.id})" >
                   <div>
                    <span style="color: red;">Eliminar</span>
                   </div>
                     </button>
                      </div>
                      </div>
                     </div>
                    `;

                    // Agregar la card al contenedor de favoritos sin sobrescribir el contenido
                    mostrarFavoritos.appendChild(card);
                } else {
                    console.log("Este producto no es favorito.");
                }
                if(bandera === 1){
                    eliminarDiv.remove();

                }
            });
        })
        .catch(error => console.error('Hubo un problema con la solicitud:', error));
        
});
 
function elimFav(id){
  let eliminarCards = document.getElementById(id)
  eliminarCards.remove();
}








    






















