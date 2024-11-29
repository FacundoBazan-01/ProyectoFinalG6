const API_URL = 'http://localhost:3001/productos';
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
                    <li><a class="dropdown-item" href="../html/favorito">Mis favoritos</a></li>
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