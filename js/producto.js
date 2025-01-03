const USERS_API_URL = 'http://localhost:3001/usuarios';

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


divImgChica = document.getElementById("divImgChica");
divCarosuel = document.getElementById("divCarosuel");
divCaractProduct = document.getElementById("divCaractProduct");
divDescripProduct = document.getElementById("divDescripProduct");
divPrecioProduct = document.getElementById("divPrecioProduct");
divNameProduct = document.getElementById("divNameProduct");
divVendedorName = document.getElementById("divVendedorName");
divCantidadProduct = document.getElementById("divCantidadProduct");
inputTarjetaCre = document.getElementById("inputTarjetaCre");
inputTarjetaDeb = document.getElementById("inputTarjetaDeb");

let usuarios = "";
let productos = "";
let vendedores = "";
let Id_product = "";
let Id_cliente = "";
let Id_vendedor = "";
let nombre_vendedor = "";
let nombre_usuario = "";

const traerDatos = async () => {
  try {
    usuarios = await axios.get("http://localhost:3001/usuarios");
    productos = await axios.get("http://localhost:3001/productos");
    console.log(productos.data);
    vendedores = await axios.get("http://localhost:3001/vendedores");
  } catch (error) {
    console.error(error);
  }
};

traerDatos();

const mostrarDatosDivs = async () => {
  let contador = 1;
  let productoEnVista = "";
  let numeroAleatorio = Math.floor(Math.random() * 5) + 1;
  console.log(numeroAleatorio);
  try {
    for (let i = 0; i < productos.data.length; i++) {
      if (productos.data[i].productWatch === false) {
        contador++;
      } else {
        console.log(`producto encontrado ${productos.data[i].id}`);
        contador = 0;
        productoEnVista = await productos.data[i];
        Id_product = await productos.data[i].id;
        break;
      }
    }

    if (contador === 0) {
      productoEnVista.img.map((dato) => {
        divImgChica.innerHTML += `
         <div>
             <img src="${dato}"
              width="60px" class=" img-chica my-2">
        </div>
        `;
      });

      productoEnVista.img.map((dato) => {
        divCarosuel.innerHTML += `
      <div class="carousel-item active">
        <img src="${dato} "alt="..." >
      </div>
      `;
      });

      productoEnVista.caracteristicas.map((dato) => {
        divCaractProduct.innerHTML += `
      <ul>
        <li class="my-1" style="font-size: 20px;">${dato} </li>
      </ul>
      `;
      });

      productoEnVista.descripcion.map((dato) => {
        divDescripProduct.innerHTML += `
          <div>
            <p style="color: #666; font-size: 20px;">
            ${dato}
            </p>
          </div>
      `;
      });

      divPrecioProduct.innerHTML = `
    <div class="d-flex">
      <span style="font-size: 36px ;">$${productoEnVista.precio} </span>
    </div>
    <div class="d-flex" >
      <a href="../html/error404.html"
      style="font-size: 14px; text-decoration: none;">Ver los
      medios de pago</a>
    </div>
    `;

      divNameProduct.innerHTML = `
    <h1 class="card-Product-titulo">${productoEnVista.nombre} </h1>
    `;

      divCantidadProduct.innerHTML = `
    <div class="d-flex">
      <span
        style="font-size: 16px; color: rgba(0, 0, 0, .9);">Cantidad: ${productoEnVista.stock} </span>                                                    
    </div>
   
    `;
    }

    for (let i = 0; i < vendedores.data.length; i++) {
      if (numeroAleatorio == vendedores.data[i].id) {
        Id_vendedor = await vendedores.data[i].id;
        nombre_vendedor = await vendedores.data[i].nombre;
        divVendedorName.innerHTML = `
        <span style="font-size: 20px;">Vendido por ${vendedores.data[i].nombre} </span>
        `;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

setTimeout(() => {
  mostrarDatosDivs();
}, 1000);

/* Agregar producto a favoritos */
const agregarFav = async () => {
  try {
    let contador = 0;
    for (let i = 1; i < usuarios.data.length; i++) {
      if (usuarios.data[i].login === true) {
        Id_cliente = await usuarios.data[i].id;
        contador = 0;
        break;
      } else {
        contador = contador + 1;
      }
    }
    if (contador != 0) {
      alert("Debes iniciar sesion antes de realizar esta accion");
      window.location.href = "./login.html";
    }

    for (let i = 1; i < productos.data.length; i++) {
      if (Id_product == productos.data[i].id) {
        if (productos.data[i].productFav == true) {
          Swal.fire({
            title:
              "Este producto ya se encuentra en tus favoritos, deseas eliminarlo?",
            showDenyButton: true,
            confirmButtonText: "No eliminar",
            denyButtonText: `Eliminar`,
          }).then(async (result) => {
            if (result.isDenied) {
              await axios.patch(
                `http://localhost:3001/productos/${Id_product}`,
                { productFav: false }
              );
              console.log(productos.data[i].productFav);
              Swal.fire("Producto eliminado correctamente!", "", "success");
            }
          });
        } else {
          Swal.fire({
            title: "Quieres agregar este producto a tus favoritos?",
            showDenyButton: true,
            confirmButtonText: "Agregar",
            denyButtonText: `No agregar`,
          }).then(async (result) => {
            if (result.isConfirmed) {
              await axios.patch(
                `http://localhost:3001/productos/${Id_product}`,
                { productFav: true }
              );
              console.log(productos.data[i].productFav);
              Swal.fire("Producto agreado correctamente!", "", "success");
            }
          });
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};
/* Agregar producto a carrito */
const agregarCar = async () => {
  try {
    console.log(usuarios.data);

    let contador = 0;
    for (let i = 1; i < usuarios.data.length; i++) {
      if (usuarios.data[i].login === true) {
        Id_cliente = await usuarios.data[i].id;
        contador = 0;
        break;
      } else {
        contador = contador + 1;
      }
    }
    if (contador != 0) {
      alert("Debes iniciar sesion antes de realizar esta accion");
      window.location.href = "./login.html";
    }

    for (let i = 1; i < productos.data.length; i++) {
      if (Id_product == productos.data[i].id) {
        if (productos.data[i].productCar == true) {
          Swal.fire({
            title:
              "Este producto ya se encuentra en tu carrito, deseas eliminarlo?",
            showDenyButton: true,
            confirmButtonText: "No eliminar",
            denyButtonText: `Eliminar`,
          }).then((result) => {
            if (result.isDenied) {
              axios.patch(`http://localhost:3001/productos/${Id_product}`, {
                productCar: false,
              });
              console.log(productos.data[i].productCar);
              Swal.fire("Producto eliminado correctamente!", "", "success");
            }
          });
        } else {
          Swal.fire({
            title: "Quieres agregar este producto a tu carrito?",
            showDenyButton: true,
            confirmButtonText: "Agregar",
            denyButtonText: `No agregar`,
          }).then((result) => {
            if (result.isConfirmed) {
              axios.patch(`http://localhost:3001/productos/${Id_product}`, {
                productCar: true,
              });
              console.log(productos.data[i].productCar);
              Swal.fire("Producto agreado correctamente!", "", "success");
            }
          });
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};

/* Validar user antes de iniciar la compra */
const validarUserCompra = async () => {
  try {
    let contador = 0;
    for (let i = 1; i < usuarios.data.length; i++) {
      if (usuarios.data[i].login === true) {
        Id_cliente = await usuarios.data[i].id;
        contador = 0;
        break;
      } else {
        contador = contador + 1;
      }
    }
    if (contador != 0) {
      alert("Debes iniciar sesion antes de realizar esta accion");
      window.location.href = "./login.html";
    }
  } catch (error) {
    console.error(error);
  }
};

/* Mostar input de tarjeta de credito */
const mostrarInputCre = () => {
  inputTarjetaCre.innerHTML = `
   <input type="number"  style="display: block;" id="inputTarjetaCreV"
      class="form-control" aria-describedby="passwordHelpInline"
      placeholder="Ingresa tu numero de tarjeta">
  `;
  inputTarjetaDeb.innerHTML = `
   <input type="number"  style="display: none;" id="inputTarjetaDebV"
      class="form-control" aria-describedby="passwordHelpInline"
      placeholder="Ingresa tu numero de tarjeta">
  `;
};
/* Ocultar los inputs */
const ocultarInputs = () => {
  inputTarjetaCre.innerHTML = `
  <input type="number"  style="display: none;" id="inputTarjetaCreV"
     class="form-control" aria-describedby="passwordHelpInline"
     placeholder="Ingresa tu numero de tarjeta">
 `;
  inputTarjetaDeb.innerHTML = `
  <input type="number"  style="display: none;" id="inputTarjetaDebV"
     class="form-control" aria-describedby="passwordHelpInline"
     placeholder="Ingresa tu numero de tarjeta">
 `;
};

/* Mostar input de tarjeta de debito */
const mostrarInputDeb = () => {
  inputTarjetaCre.innerHTML = `
  <input type="number"  style="display: none;" id="inputTarjetaCreV"
     class="form-control" aria-describedby="passwordHelpInline"
     placeholder="Ingresa tu numero de tarjeta">
 `;
  inputTarjetaDeb.innerHTML = `
  <input type="number"  style="display: block;" id="inputTarjetaDebV"
     class="form-control" aria-describedby="passwordHelpInline"
     placeholder="Ingresa tu numero de tarjeta">
 `;
};

const realizarCompra = async (event) => {
  try {
    cantidadAComprar = document.getElementById("cantidadAComprar").value;
    inputEfectivo = document.getElementById("efectivo").value;
    inputTarjetaDebV = document.getElementById("inputTarjetaDebV").value;
    inputTarjetaCreV = document.getElementById("inputTarjetaCreV").value;

    console.log(inputEfectivo);
    console.log(inputTarjetaCreV);
    console.log(inputTarjetaDebV);

    for (let i = 0; i < productos.data.length; i++) {
      if (Id_product == productos.data[i].id) {
        if (
          cantidadAComprar > 0 &&
          cantidadAComprar <= productos.data[i].stock
        ) {
          console.log(productos.data[i].stock);
          let totalAPagar = cantidadAComprar * productos.data[i].precio;
          const stockActualizado = productos.data[i].stock - cantidadAComprar;
          console.log(stockActualizado);

          /* PAGO CON TARJETA DE CREDITO */
          if (inputTarjetaCreV != "") {
            Swal.fire({
              title: `El total a pagar es: $${totalAPagar}, desea realizar la compra con tarjeta de credito?`,
              showDenyButton: true,
              confirmButtonText: "Si",
              denyButtonText: `No`,
            }).then((result) => {
              if (result.isConfirmed) {
                /* Creando nueva venta */
                let ventaNueva = {
                  id_cliente: Id_cliente,
                  id_producto: Id_product,
                  id_vendedor: Id_vendedor,
                  cliente: nombre_usuario,
                  vendedor: nombre_vendedor,
                  producto: productos.data[i].nombre,
                  precioProducto: productos.data[i].precio,
                  cantidadComprada: cantidadAComprar,
                  totalPagado: totalAPagar,
                };
                if (ventaNueva) {
                  Swal.fire({
                    title: "Felicidades, compra realizada!",
                    confirmButtonText: "Ok",
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      await axios.post(
                        "http://localhost:3001/ventas",
                        ventaNueva
                      );
                      await axios.patch(
                        `http://localhost:3001/productos/${Id_product}`,
                        { stock: stockActualizado }
                      );
                    }
                  });
                }
              }
            });
          } else {
            /* PAGO CON TARJETA DE DEBITO */
            if (inputTarjetaDebV != "") {
              Swal.fire({
                title: `El total a pagar es: $${totalAPagar}, desea realizar la compra tarjeta de debito?`,
                showDenyButton: true,
                confirmButtonText: "Si",
                denyButtonText: `No`,
              }).then((result) => {
                if (result.isConfirmed) {
                  /* Creando nueva venta */
                  let ventaNueva = {
                    id_cliente: Id_cliente,
                    id_producto: Id_product,
                    id_vendedor: Id_vendedor,
                    cliente: nombre_usuario,
                    vendedor: nombre_vendedor,
                    producto: productos.data[i].nombre,
                    precioProducto: productos.data[i].precio,
                    cantidadComprada: cantidadAComprar,
                    totalPagado: totalAPagar,
                  };
                  if (ventaNueva) {
                    Swal.fire({
                      title: "Felicidades, compra realizada!",
                      confirmButtonText: "Ok",
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        await axios.post(
                          "http://localhost:3001/ventas",
                          ventaNueva
                        );
                        await axios.patch(
                          `http://localhost:3001/productos/${Id_product}`,
                          { stock: stockActualizado }
                        );
                      }
                    });
                  }
                }
              });
            } else {
              /* PAGO CON EFECTIVO */
              if (inputEfectivo) {
                Swal.fire({
                  title: `El total a pagar es: $${totalAPagar}, desea realizar la compra con efectivo?`,
                  showDenyButton: true,
                  confirmButtonText: "Si",
                  denyButtonText: `No`,
                }).then((result) => {
                  if (result.isConfirmed) {
                    /* Creando nueva venta */
                    let ventaNueva = {
                      id_cliente: Id_cliente,
                      id_producto: Id_product,
                      id_vendedor: Id_vendedor,
                      cliente: nombre_usuario,
                      vendedor: nombre_vendedor,
                      producto: productos.data[i].nombre,
                      precioProducto: productos.data[i].precio,
                      cantidadComprada: cantidadAComprar,
                      totalPagado: totalAPagar,
                    };
                    if (ventaNueva) {
                      Swal.fire({
                        title: "Felicidades, compra realizada!",
                        confirmButtonText: "Ok",
                      }).then(async (result) => {
                        if (result.isConfirmed) {
                          await axios.post(
                            "http://localhost:3001/ventas",
                            ventaNueva
                          );
                          await axios.patch(
                            `http://localhost:3001/productos/${Id_product}`,
                            { stock: stockActualizado }
                          );
                        }
                      });
                    }
                  }
                });
              } else {
                alert("Elige una opcion valida");
              }
            }
          }
        } else {
          alert("Ingrese un cantidad valida");
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};

document.getElementById("addCar").addEventListener("click", () => agregarCar());
document.getElementById("addFav").addEventListener("click", () => agregarFav());
document
  .getElementById("empezarCompra")
  .addEventListener("click", () => validarUserCompra());
document
  .getElementById("tarjetaDeb")
  .addEventListener("click", () => mostrarInputDeb());
document
  .getElementById("efectivo")
  .addEventListener("click", () => ocultarInputs());
document
  .getElementById("tarjetaCre")
  .addEventListener("click", () => mostrarInputCre());
document
  .getElementById("addCompra")
  .addEventListener("click", () => realizarCompra());

  
