const API_URL = 'http://localhost:3001/productos';

// Función para establecer productoEnVista en false para todos los productos
const inicializarProductos = async () => {
    try {
        // Obtengo los productos desde el backend
        const { data: productos } = await axios.get(API_URL);

        // Actualizo cada producto para que productoEnVista sea false
        const actualizaciones = productos.map(async (producto) => {
            if (producto.productWatch !== false) {
                // Envio la actualización al backend
                await axios.patch(`${API_URL}/${producto.id}`, { productWatch: false });
            }
        });

        await Promise.all(actualizaciones);

        console.log('Todos los productos se han inicializado con productoEnVista: false');
    } catch (error) {
        console.error('Error al inicializar los productos:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    inicializarProductos();
});

const getProductos = async () => {
    try {
        let response = await axios.get(API_URL);

        const sectionProductos = document.getElementById("cardProducto");

        // Creo el div para las Cards
        sectionProductos.innerHTML = `
            <div class="row d-flex align-items-center justify-content-center">
            </div>
        `;

        const row = sectionProductos.querySelector('.row');

        // Seleccionar los primeros 6 productos
        const productosLimitados = response.data.slice(0, 6); 

        // O para 6 aleatorios:
        // const productosLimitados = response.data.sort(() => 0.5 - Math.random()).slice(0, 6);

        productosLimitados.forEach(producto => {
            row.innerHTML += `
                <div class="col-xl-2 col-md-4 col-sm-6 d-flex align-items-center justify-content-center">
                    <div class="card cardProductos mt-xl-0 mt-3 mt-sm-custom">
                        <div class="card-body text-center">
                            <img src="${producto.img}" alt="${producto.nombre}" class="img-fluid">
                            <h2 class="">${producto.nombre}</h2>
                            <p class="mt-2">$ ${producto.precio}</p>
                            <a href="../html/producto.html" class="btn btnProducto" data-id="${producto.id}">Mostrar producto</a>
                        </div>
                    </div>
                </div>
            `;
        });

        // Agrego el evento al boton
        const botones = document.querySelectorAll('.btnProducto');
        botones.forEach(boton => {
            boton.addEventListener('click', async (event) => {
                event.preventDefault(); 
                const productoId = boton.getAttribute('data-id'); // Obtengo el ID del producto

                await setProductoEnVista(productoId); 
                window.location.href = boton.getAttribute('href');
            });
        });
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
};

// Función para productoEnVista a true
const setProductoEnVista = async (id) => {
    try {
        await axios.patch(`${API_URL}/${id}`, { productWatch: true });
        console.log(`Producto con ID ${id} actualizado a productoEnVista: true`);
    } catch (error) {
        console.error(`Error al actualizar el producto con ID ${id}:`, error);
    }
};

getProductos();

