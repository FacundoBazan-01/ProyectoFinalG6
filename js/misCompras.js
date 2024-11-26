const USERS_API_URL = 'http://localhost:3001/usuarios';

// Función para verificar usuarios logueados y cambiar el navbar
const actualizarNavbarConUsuario = async () => {
    try {
        // Obtengo los usuarios desde el backend
        const { data: usuarios } = await axios.get(USERS_API_URL);

        // Busco el usuario con login=true
        const userLogueado = usuarios.find(usuario => usuario.login === true);

        // Referencia a los elementos del navbar
        const crearCuentaLink = document.querySelector('.linksCuenta .nav-item:nth-child(1)');
        const loginLink = document.querySelector('.linksCuenta .nav-item:nth-child(2)');
        const misComprasLink = document.querySelector('.linksCuenta .nav-item:nth-child(3)');
        const linksCuenta = document.querySelector('.linksCuenta');

        if (userLogueado) {
            // Oculta los enlaces "Creá tu cuenta" e "Ingresa"
            crearCuentaLink.style.display = "none";
            loginLink.style.display = "none";
            misComprasLink.style.display = "none";

            // Crea un menú desplegable para el usuario logueado
            const userDropdown = document.createElement("li");
            userDropdown.classList.add("nav-item", "dropdown");
            userDropdown.innerHTML = `
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ${userLogueado.usuario}
                </a>
                <ul class="dropdown-menu dropdownUsuarios" aria-labelledby="userDropdown">
                    <li><a class="dropdown-item" href="./html/MiCuenta.html">Mi Cuenta</a></li>
                    <li><a class="dropdown-item" href="./html/error404.html">Historial</a></li>
                    <li><a class="dropdown-item" href="./html/error404.html">Preguntas</a></li>
                    <li><a class="dropdown-item" href="./html/error404.html">Opiniones</a></li>
                    <li><a class="dropdown-item" href="./html/error404.html">Préstamos</a></li>
                    <li><a class="dropdown-item" href="./html/error404.html">Suscripciones</a></li>
                    <li><a class="dropdown-item" href="./html/error404.html">Mercado Play</a></li>
                    <li><button class="dropdown-item btn btn-danger" id="logoutButton">Cerrar Sesión</button></li>
                </ul>
            `;

            // Agrega el menú desplegable a la navbar
            linksCuenta.appendChild(userDropdown);

            // Agrega el enlace "Mis compras" como un elemento independiente
            const myPurchasesLink = document.createElement("li");
            myPurchasesLink.classList.add("nav-item");
            myPurchasesLink.innerHTML = `<a class="nav-link" href="./html/misCompras.html">Mis compras</a>`;
            linksCuenta.appendChild(myPurchasesLink);

            console.log(`Usuario logueado: ${loggedInUser.usuario}`);

            // Agrega evento al botón de "Cerrar Sesión"
            const logoutButton = document.getElementById("logoutButton");
            logoutButton.addEventListener("click", async () => {
                try {
                    // Actualiza el atributo login del usuario a false en el servidor
                    await axios.patch(`${USERS_API_URL}/${loggedInUser.id}`, { login: false });
                    console.log("Sesión cerrada exitosamente.");

                    // Recarga la página para actualizar la navbar
                    window.location.reload();
                } catch (error) {
                    console.error("Error al cerrar sesión:", error);
                }
            });
        } else {
            console.log('No hay usuarios logueados.');
        }
    } catch (error) {
        console.error('Error al actualizar la navbar:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    actualizarNavbarConUsuario();
});

// Funcion para colapsar el sidebar
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});
