const USERS_API_URL = 'http://localhost:3001/usuarios';
const VENTAS_API_URL = 'http://localhost:3001/ventas';

// Función para verificar usuarios logueados y cambiar el navbar
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
  
 

const mostrarCompras = async () => {
    try {
        // Obtengo las ventas desde el backend
        let response = await axios.get(VENTAS_API_URL);
        const ventas = response.data;
        console.log('Ventas obtenidas:', ventas);

        // Selecciono la sección donde se mostrarán las compras
        const sectionCompras = document.getElementById("cardProductosComprados");

        // Verifico que haya ventas
        if (ventas.length > 0) {
            // Itero sobre cada venta para generar su card
            ventas.forEach(venta => {
                sectionCompras.innerHTML += `
                    <div id="cardProductosComprados">
                        <div class="card-mercado-libre">
                            <div class="card-header">
                                <div class="d-flex justify-content-between">
                                    <p class="fecha">4 de abril</p>
                                    <a href="../html/error404.html" class="opinar text-center">Opinar</a>
                                </div>
                            </div>
                            <div class="producto">
                                <img src="#" alt="${venta.producto}" class="product-image" />
                                <div class="info-producto">
                                    <p class="estado">Entregado</p>
                                    <p class="fecha-entrega">Llegó el 10 de abril</p>
                                    <p class="nombre-producto">${venta.producto}</p>
                                    <p class="cantidad">${venta.cantidadComprada} unidad</p>
                                </div>
                            <div class="vendedor">
                                <p>${venta.vendedor}</p>
                                <a href="../html/error404.html" class="ver-mensajes">Ver mensajes</a>
                            </div>
                            </div>
                            <div class="acciones">
                                <a class="btn-ver-compra">Ver compra</a>
                                <a class="btn-volver-comprar">Volver a comprar</a>
                            </div>
                        </div>
                    </div>
                `;
            });
        } else {
            sectionCompras.innerHTML = `<p>No se encontraron compras.</p>`;
        }
    } catch (error) {
        console.error('Error al obtener las compras:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    actualizarNavbarConUsuario();
    mostrarCompras();
});

const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");

// Función para colapsar/expandir el sidebar
const toggleSidebar = () => {
    sidebar.classList.toggle("collapsed");
};

// Detectar cambios en el ancho de la ventana
const handleResize = () => {
    if (window.innerWidth < 1400) {
        sidebar.classList.add("collapsed");
    } else {
        sidebar.classList.remove("collapsed");
    }
};

// Eventos para la hamburguesa y cambio de tamaño de ventana
menuToggle.addEventListener("click", toggleSidebar);
window.addEventListener("resize", handleResize);

// Inicializar estado según el tamaño actual
handleResize();
