/* tabla usuario */
function TablaUsuario() {
  const encabezadoUsuario = document.getElementById("thead");
  encabezadoUsuario.innerHTML = "";

  thead.innerHTML = `
            <th scope="col">id</th>
            <th scope="col">Usuarios</th>
            <th scope="col">Email</th>
            <th scope="col">Telefono</th>
            <th scope="col">Rol</th>
            <th scope="col">Acciones</th>
    `;

  const cuerpoUsuario = document.getElementById("tbody");
  cuerpoUsuario.innerHTML = "";

  const getUsuario = async () => {
    try {
      let response = await axios.get("http://localhost:3001/usuarios");

      response.data.map(
        (usuarios) =>
          (document.getElementById("tbody").innerHTML += `
                <th scope="row">${usuarios.id}</th>
                <td>${usuarios.usuario}</td>
                <td>${usuarios.email}</td>
                <td>${usuarios.telefono}</td>
                <td>${usuarios.rol}</td>
                <td>
                <button type="button" class="btn btn-danger"><i class="bi bi-trash3-fill"></i></button>
                <button type="button" class="btn btn-warning"><i class="bi bi-eye-fill"></i></button>
                <button type="button" class="btn btn-success"><i class="bi bi-pencil-fill"></i></button>
                </td>
          `)
      );
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  getUsuario();

  /* poner botonusuario y sacar boton vendedor y producto */
  document.getElementById("botonAgregar").style.display = "block";
  document.getElementById("botonAgregar2").style.display = "none";
  document.getElementById("botonAgregar3").style.display = "none";

  /* agregar y volver (formulario) */
  const handleClick = () => {
    document.getElementById("botonAgregar").style.display = "none";
    document.getElementById("form").style.display = "block";
    document.getElementById("boton").style.display = "block";
  };

  const handlebackClick = () => {
    document.getElementById("botonAgregar").style.display = "block";
    document.getElementById("form").style.display = "none";
    document.getElementById("boton").style.display = "none";
  };

  document.getElementById("volver").addEventListener("click", handlebackClick);

  document
    .getElementById("botonAgregar")
    .addEventListener("click", handleClick);

  /* sacar formulario 2 y sus botones */
  document.getElementById("form2").style.display = "none";
  document.getElementById("boton2").style.display = "none";

  /* sacar formulario 3 y sus botones */
  document.getElementById("form3").style.display = "none";
  document.getElementById("boton3").style.display = "none";
}

/* tabla vendedor */
function TablaVendedores() {
  const encabezadoVendedores = document.getElementById("thead");
  encabezadoVendedores.innerHTML = "";

  thead.innerHTML = `
            <th scope="col">id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Email</th>
            <th scope="col">Telefono</th>
            <th scope="col">Acciones</th>
    `;

  const cuerpoVendedores = document.getElementById("tbody");
  cuerpoVendedores.innerHTML = "";

  const getVendedores = async () => {
    try {
      let response = await axios.get("http://localhost:3001/vendedores");

      response.data.map(
        (vendedores) =>
          (document.getElementById("tbody").innerHTML += `
                <th scope="row">${vendedores.id}</th>
                <td>${vendedores.nombre}</td>
                <td>${vendedores.apellido}</td>
                <td>${vendedores.email}</td>
                <td>${vendedores.telefono}</td>
                <td>
                <button type="button" class="btn btn-danger"><i class="bi bi-trash3-fill"></i></button>
                <button type="button" class="btn btn-warning"><i class="bi bi-eye-fill"></i></button>
                <button type="button" class="btn btn-success"><i class="bi bi-pencil-fill"></i></button>
                </td>
          `)
      );
    } catch (error) {
      console.error("Error al obtener a los vendedores:", error);
    }
  };

  getVendedores();

  /* poner boton vendedor y sacar boton usuario y producto */
  document.getElementById("botonAgregar").style.display = "none";
  document.getElementById("botonAgregar2").style.display = "block";
  document.getElementById("botonAgregar3").style.display = "none";

  /* agregar y volver (formulario2) */
  const handleClick = () => {
    document.getElementById("botonAgregar2").style.display = "none";
    document.getElementById("form2").style.display = "block";
    document.getElementById("boton2").style.display = "block";
  };

  const handlebackClick = () => {
    document.getElementById("botonAgregar2").style.display = "block";
    document.getElementById("form2").style.display = "none";
    document.getElementById("boton2").style.display = "none";
  };

  document.getElementById("volver2").addEventListener("click", handlebackClick);

  document
    .getElementById("botonAgregar2")
    .addEventListener("click", handleClick);

  /* sacar formulario 1 y sus botones */
  document.getElementById("form").style.display = "none";
  document.getElementById("boton").style.display = "none";

  /* sacar formulario 3 y sus botones */
  document.getElementById("form3").style.display = "none";
  document.getElementById("boton3").style.display = "none";
}

function TablaProductos() {
  const encabezadoProductos = document.getElementById("thead");
  encabezadoProductos.innerHTML = "";

  thead.innerHTML = `
            <th scope="col">id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Marca</th>
            <th scope="col">Precio</th>
            <th scope="col">Stock</th>
            <th scope="col">Acciones</th>
    `;

  const cuerpoProdutos = document.getElementById("tbody");
  cuerpoProdutos.innerHTML = "";

  const getProducts = async () => {
    try {
      let response = await axios.get("http://localhost:3001/productos");

      response.data.map(
        (productos) =>
          (document.getElementById("tbody").innerHTML += `
                <th scope="row">${productos.id}</th>
                <td>${productos.nombre}</td>
                <td>${productos.marca}</td>
                <td>${productos.precio}</td>
                <td>${productos.stock}</td>
                <td>
                <button type="button" class="btn btn-danger"><i class="bi bi-trash3-fill"></i></button>
                <button type="button" class="btn btn-warning"><i class="bi bi-eye-fill"></i></button>
                <button type="button" class="btn btn-success"><i class="bi bi-pencil-fill"></i></button>
                </td>
          `)
      );
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  getProducts();

  /* poner boton producto y sacar boton vendedor y usuario */
  document.getElementById("botonAgregar").style.display = "none";
  document.getElementById("botonAgregar2").style.display = "none";
  document.getElementById("botonAgregar3").style.display = "block";

  /* agregar y volver (formulario3) */
  const handleClick = () => {
    document.getElementById("botonAgregar3").style.display = "none";
    document.getElementById("form3").style.display = "block";
    document.getElementById("boton3").style.display = "block";
  };

  const handlebackClick = () => {
    document.getElementById("botonAgregar3").style.display = "block";
    document.getElementById("form3").style.display = "none";
    document.getElementById("boton3").style.display = "none";
  };

  document.getElementById("volver3").addEventListener("click", handlebackClick);

  document
    .getElementById("botonAgregar3")
    .addEventListener("click", handleClick);

  /* sacar formulario 1 y sus botones */
  document.getElementById("form").style.display = "none";
  document.getElementById("boton").style.display = "none";

  /* sacar formulario 2 y sus botones */
  document.getElementById("form2").style.display = "none";
  document.getElementById("boton2").style.display = "none";
}

/* mostrar ususario cuando abra la pagina */

document.addEventListener("DOMContentLoaded", () => {
  TablaUsuario();
});

/* para agregar un usuario con el boton confirmar */

const handleconfirmar = async () => {
  try {
    let usuario = document.getElementById("usuario").value;
    let contraseña = document.getElementById("contraseña").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    let rol = document.getElementById("rol").value;

    let response = await axios.post("http://localhost:3001/usuarios", {
      usuario,
      contraseña,
      email,
      telefono,
      rol,
    });

    if (response) {
      alert("usuario agregado correctamente");
    } else {
      alert("usuario agregado incorrectamente");
    }
  } catch (error) {
    console.log(error);
  }
};

document.getElementById("confirmar").addEventListener("click", handleconfirmar);

/* para agregar un vendedor con el boton confirmar2 */

const handleconfirmar2 = async () => {
  try {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let email = document.getElementById("email2").value;
    let telefono = document.getElementById("telefono2").value;

    let response = await axios.post("http://localhost:3001/vendedores", {
      nombre,
      apellido,
      email,
      telefono,
    });

    if (response) {
      alert("usuario agregado correctamente");
    } else {
      alert("usuario agregado incorrectamente");
    }
  } catch (error) {
    console.log(error);
  }
};

document
  .getElementById("confirmar2")
  .addEventListener("click", handleconfirmar2);

/* para agregar un producto con el boton confirmar3 */

const handleconfirmar3 = async () => {
  try {
    let nombre = document.getElementById("nombre2").value;
    let marca = document.getElementById("marca").value;
    let descripcion = document.getElementById("descripcion").value;
    let caracteristicas = document.getElementById("caracteristicas").value;
    let precio = document.getElementById("precio").value;
    let stock = document.getElementById("stock").value;
    let img = document.getElementById("img").value;

    let response = await axios.post("http://localhost:3001/productos", {
      nombre,
      marca,
      descripcion,
      caracteristicas,
      precio,
      stock,
      img,
      productFav:false,
      productCar:false,
      productWatch:false,
    });

    if (response) {
      alert("producto agregado correctamente");
    }
  } catch (error) {
    console.log(error);
    alert("Error al agregar el producto");
  }
};

document
  .getElementById("confirmar3")
  .addEventListener("click", handleconfirmar3);
