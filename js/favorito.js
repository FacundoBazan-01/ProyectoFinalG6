const url = "http://localhost:3001/productos";



const actualizarNavbarConUsuario = async () => {
  try {
    const { data: usuarios } = await axios.get(USERS_API_URL);

    const userLogueado = usuarios.find(usuario => usuario.login === true);

    const crearCuentaLink = document.querySelector('.linksCuenta .nav-item:nth-child(1)');
    const loginLink = document.querySelector('.linksCuenta .nav-item:nth-child(2)');
    const misComprasLink = document.querySelector('.linksCuenta .nav-item:nth-child(3)');
    const linksCuenta = document.querySelector('.linksCuenta');

    if (userLogueado) {
      crearCuentaLink.style.display = "none";
      loginLink.style.display = "none";
      misComprasLink.style.display = "none";

      const userDropdown = document.createElement("li");
      userDropdown.classList.add("nav-item", "dropdown");
      userDropdown.innerHTML = `
              <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  ${userLogueado.usuario}
              </a>
              <ul class="dropdown-menu dropdownUsuarios" aria-labelledby="userDropdown">
                  <li><a class="dropdown-item" href="../html/MiCuenta.html">Mi Cuenta</a></li>
                  <li><a class="dropdown-item" href="../html/carrito.html">Mi Carrito</a></li>
                  <li><a class="dropdown-item" href="../html/favorito.html">Mis favoritos</a></li>
                  <li><a class="dropdown-item" href="../html/error404.html">Historial</a></li>
                  <li><a class="dropdown-item" href="../html/error404.html">Preguntas</a></li>
                  <li><a class="dropdown-item" href="../html/error404.html">Opiniones</a></li>
                  <li><a class="dropdown-item" href="../html/error404.html">Préstamos</a></li>
                  <li><a class="dropdown-item" href="../html/error404.html">Suscripciones</a></li>
                  <li><a class="dropdown-item" href="../html/error404.html">Mercado Play</a></li>
                  <li><button class="dropdown-item btn btn-danger" id="logoutButton">Cerrar Sesión</button></li>
              </ul>
          `;

      linksCuenta.appendChild(userDropdown);

      const linksMisCompras = document.createElement("li");
      linksMisCompras.classList.add("nav-item");
      linksMisCompras.innerHTML = `<a class="nav-link" href="../html/misCompras.html">Mis compras</a>`;
      linksCuenta.appendChild(linksMisCompras);

      console.log(`Usuario logueado: ${userLogueado.usuario}`);

      const logoutButton = document.getElementById("logoutButton");
      logoutButton.addEventListener("click", async () => {
        try {
          await axios.patch(`${USERS_API_URL}/${userLogueado.id}`, { login: false });
          console.log("Sesión cerrada exitosamente.");
          window.location.reload();
        } catch (error) {
          console.error("Error al cerrar sesión:", error);
        }
      });
    } else {
      console.log('No hay usuarios logueados.');
    }
  } catch (error) {
    console.error('Error al actualizar el navbar:', error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  actualizarNavbarConUsuario();
});



let usuarios = ""
let productos = ""
let vendedores = ""
let Id_vendedor = ""
let Id_product = ""
let Id_cliente = ""
let nombre_vendedor = ""
let nombreProducto = ""
let precioporProducto = ""
let stockBD = ""
let numeroAleatorio = ""
let productoCarrito = ""






const traerDatos = async () => {
  try {
    usuarios = await axios.get("http://localhost:3001/usuarios");
    productos = await axios.get("http://localhost:3001/productos");
    // console.log(productos.data)
    vendedores = await axios.get("http://localhost:3001/vendedores");
    //console.log(vendedores.data)
  } catch (error) {
    console.error(error);
  }
};

traerDatos();




const mostrarProducto = async () => {

  try {

    const datosProductos = document.getElementById("cardFav")

    let contador = 0;
    for (let i = 1; i < usuarios.data.length; i++) {
      if (usuarios.data[i].login === true) {
        Id_cliente = await usuarios.data[i].id;
        nombre_usuario = await usuarios.data[i].usuario;


        contador = 0;
        break;
      } else {
        contador = contador + 1;
      }
    }

    /* Encuentro el usuario que esta activo */
    const usuaruoActivo = usuarios.data.find(usuario => usuario.id === Id_cliente)


    for (let i = 0; i < productos.data.length; i++) {

      for (let j = 0; j < usuaruoActivo.productFav.length; j++) {

        if (productos.data[i].id === usuaruoActivo.productFav[j]) {

          productoFavorito = await productos.data[i];
          numeroAleatorio = Math.floor(Math.random() * 4) + 1;
          nombre_vendedor = vendedores.data[numeroAleatorio].nombre


          datosProductos.innerHTML += `
          <div id="cardProductosComprados">
              <div class="card-mercado-libre">
                  <div class="card-header">
                    <h3>${productoFavorito.nombre}</h3>
                  </div>
                  <div class="producto">
                      <img src="${productoFavorito.img[0]}" alt="" class="product-image" />
                      <div class="info-producto">
                          <p class="estado">Vendedor ${vendedores.data[numeroAleatorio].nombre}</p>
                          <p class="fecha-entrega">Llega el 10 de abril</p>
                          <p class="nombre-producto"></p>
                          <p class="cantidad">Cantidad disponible: ${productoFavorito.stock}</p>
                      </div>
                  <div class="vendedor">
                      <p>$${productoFavorito.precio}</p>
                      
                  </div>
                  </div>
                  <div class="acciones">
                      <button class="btn-volver-comprar" onClick="handleDelete('${productoFavorito.id}')">Eliminar </button>
                  </div>
              </div>
          </div>
      `;

          break;


        }

      }

    }

  } catch (error) {

    console.error(error)

  }


}



setTimeout(() => {
  mostrarProducto();
}, 1000);






const handleDelete = async (id) => {

   const usuaruoActivo = usuarios.data.find(usuario =>  usuario.id === Id_cliente)

  if (usuaruoActivo.productFav.includes(id)) {
    Swal.fire({
      title:
        "Deseas eliminar este producto del carrito?",
      showDenyButton: true,
      confirmButtonText: "No eliminar",
      denyButtonText: `Eliminar`,
    }).then(async (result) => {
      if (result.isDenied) {
        
        const arraysDelete = usuaruoActivo.productFav.filter(IdProduct => IdProduct !== id )
        console.log(arraysDelete)
        for (let i = 0; i < arraysDelete.length; i++) {
          console.log(arraysDelete[i])
        }
        await axios.patch(
          `http://localhost:3001/usuarios/${Id_cliente}`,
          { productFav: arraysDelete}
        );
        Swal.fire("Producto eliminado correctamente!", "", "success");
      }
    });
  } 


}
