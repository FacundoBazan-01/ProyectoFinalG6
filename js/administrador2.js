let ID = ""
let ID2 = ""
let ID3= ""


document.addEventListener("DOMContentLoaded", () => {
  Swal.fire({
    title: 'Bienvenido! Aceptar para poder ver Tabla Usuario, Vendedores, Ventas y Productos ',
    showCancelButton: true, 
    confirmButtonText: 'Aceptar',
  }).then((result) => {
    if (result.isConfirmed) {
      TablaUsuario();
    }
  });
});

function volver (){

  window.location.href = "../html/login.html";

}

/* boton borrar usuario */
const handleDelete = async (id) => {
  try {
    let response = await axios.delete("http://localhost:3001/usuarios/"+id);
    if (response) {
      alert("usuario borrado correctamente")
    }
  } catch (error) {
    console.error("no se pudo borrar el usuario",error)
  }

}

const handleActualizarUsuario = async () => {
  try {
    let usuario = document.getElementById("usuario").value;
    let contraseña = document.getElementById("contraseña").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    let rol = document.getElementById("rol").value;
    let login = document.getElementById("login").value;
    let productFav = document.getElementById("productFav1").value;
    let productCar = document.getElementById("productCar1").value;

  let response = await axios.put("http://localhost:3001/usuarios/"+ ID2,{
    usuario,
    contraseña,
    email,
    telefono,
    rol,
    login,
    productFav,
    productCar,
  })

  if (response) {
    alert("el usuario se actualizo correctamente")
  } else {
    alert("el usuario no se actualizo")
  }
  } catch (error) {
    console.error("Error al actualizar los usuarios:", error);
  }

};

document.getElementById("actualizar2").addEventListener("click", handleActualizarUsuario);

/* boton editar usuario */
const handleEditUsuario = async (id,usuarios,contraseña,email,telefono,rol,login,productFav,productCar) => {
  ID2=id;
  document.getElementById("form").style.display = "block";
  document.getElementById("botonAgregar").style.display = "none";
  document.getElementById("boton5").style.display = "block";
  document.getElementById("boton").style.display = "none";

  document.getElementById("usuario").value = usuarios
  document.getElementById("contraseña").value = contraseña
  document.getElementById("email").value = email
  document.getElementById("telefono").value = telefono
  document.getElementById("rol").value = rol
  document.getElementById("login").value = login
  document.getElementById("productFav").value = productFav
  document.getElementById("productCar").value = productCar
}

const handlebackClickUsuario = () => {
  document.getElementById("botonAgregar").style.display = "block";
  document.getElementById("form").style.display = "none";
  document.getElementById("boton5").style.display = "none";
};

document.getElementById("volver5").addEventListener("click", handlebackClickUsuario);

/* tabla usuario */
  function TablaUsuario() {
    const encabezadoTitulo = document.getElementById("h1");
    encabezadoTitulo.innerHTML = "";

  h1.innerHTML = `
          <h1 id="h1">Tabla usuario</h1>
    `;

  const encabezadoUsuario = document.getElementById("thead");
  encabezadoUsuario.innerHTML = "";

  thead.innerHTML = `
            <th scope="col">id</th>
            <th scope="col">Admin</th>
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
                <button type="button" class="btn btn-danger" onClick="handleDelete('${usuarios.id}')"><i class="bi bi-trash3-fill"></i></button>
                <button type="button" class="btn btn-success" onClick="handleEditUsuario('${usuarios.id}','${usuarios.usuario}','${usuarios.contraseña}','${usuarios.email}','${usuarios.telefono}','${usuarios.rol}','${usuarios.login}','${usuarios.productFav}','${usuarios.productCar}')"><i class="bi bi-pencil-fill"></i></button>
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

  document.getElementById("botonAgregar").addEventListener("click", handleClick);

  /* sacar formulario 2 y sus botones */
  document.getElementById("form2").style.display = "none";
  document.getElementById("boton2").style.display = "none";

  /* sacar formulario 3 y sus botones */
  document.getElementById("form3").style.display = "none";
  document.getElementById("boton3").style.display = "none";
}

/* boton borrar vendedores */
const handleDeleteVendedores = async (id) => {
  try {
    let response = await axios.delete("http://localhost:3001/vendedores/"+id);
    if (response) {
      alert("vendedo borrado correctamente")
    }else{
      alert("no se pudo borrar el vendedor")
    }
  } catch (error) {
    console.error(error)
  }

}

const handleActualizarVendedores = async () => {
  try {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let email = document.getElementById("email2").value;
    let telefono = document.getElementById("telefono2").value;

  let response = await axios.put("http://localhost:3001/vendedores/"+ ID3,{
    nombre,
    apellido,
    email,
    telefono,
  })

  if (response) {
    alert("el vendedor se actualizo correctamente")
  } else {
    alert("el vendedor no se actualizo")
  }
  } catch (error) {
    console.error("Error al actualizar los vendedores:", error);
  }

};

document.getElementById("actualizar3").addEventListener("click", handleActualizarVendedores);

/* boton editar vendedores */
const handleEditVendedores = async (id,nombre,apellido,email,telefono) => {
  ID3=id;
  document.getElementById("form2").style.display = "block";
  document.getElementById("botonAgregar2").style.display = "none";
  document.getElementById("boton6").style.display = "block";
  document.getElementById("boton2").style.display = "none";

  document.getElementById("nombre").value = nombre
  document.getElementById("apellido").value = apellido
  document.getElementById("email2").value = email
  document.getElementById("telefono2").value = telefono
}

const handlebackClickVendedores = () => {
  document.getElementById("botonAgregar2").style.display = "block";
  document.getElementById("form2").style.display = "none";
  document.getElementById("boton6").style.display = "none";
};

document.getElementById("volver6").addEventListener("click", handlebackClickVendedores);

/* tabla vendedores */
function TablaVendedores() {

  const encabezadoTitulo = document.getElementById("h1");
    encabezadoTitulo.innerHTML = "";

  h1.innerHTML = `
          <h1 id="h1">Tabla vendedores</h1>
    `;

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
                <button type="button" class="btn btn-danger" onClick="handleDeleteVendedores('${vendedores.id}')"><i class="bi bi-trash3-fill"></i></button>
                <button type="button" class="btn btn-success" onClick="handleEditVendedores('${vendedores.id}','${vendedores.nombre}','${vendedores.apellido}','${vendedores.email}','${vendedores.telefono}')"><i class="bi bi-pencil-fill"></i></button>
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

  document.getElementById("botonAgregar2").addEventListener("click", handleClick);

  const handlebackClick = () => {
    document.getElementById("botonAgregar2").style.display = "block";
    document.getElementById("form2").style.display = "none";
    document.getElementById("boton2").style.display = "none";
  };

  document.getElementById("volver2").addEventListener("click", handlebackClick);

  

  /* sacar formulario 1 y sus botones */
  document.getElementById("form").style.display = "none";
  document.getElementById("boton").style.display = "none";

  /* sacar formulario 3 y sus botones */
  document.getElementById("form3").style.display = "none";
  document.getElementById("boton3").style.display = "none";
}



/* boton editar producto */
const handleEdit = async (id,nombre,marca,descripcion,caracteristicas,precio,stock,img) => {
  ID=id;
  document.getElementById("form3").style.display = "block";
  document.getElementById("botonAgregar3").style.display = "none";
  document.getElementById("boton4").style.display = "block";
  document.getElementById("boton3").style.display = "none";


  document.getElementById("nombre2").value = nombre
  document.getElementById("marca").value = marca
  document.getElementById("descripcion").value = descripcion
  document.getElementById("caracteristicas").value = caracteristicas
  document.getElementById("precio").value = precio
  document.getElementById("stock").value = stock
  document.getElementById("img").value = img
}



const handlebackClick = () => {
  document.getElementById("botonAgregar3").style.display = "block";
  document.getElementById("form3").style.display = "none";
  document.getElementById("boton4").style.display = "none";
};

document.getElementById("volver4").addEventListener("click", handlebackClick);

const handleActualizar = async () => {
  try {
    let nombre = document.getElementById("nombre2").value;
    let marca = document.getElementById("marca").value;
    let descripcion = document.getElementById("descripcion").value;
    let caracteristicas = document.getElementById("caracteristicas").value;
    let precio = document.getElementById("precio").value;
    let stock = document.getElementById("stock").value;
    let img = document.getElementById("img").value;
    let productWatch = document.getElementById("productWatch").value;

  let response = await axios.put("http://localhost:3001/productos/"+ ID,{
    nombre,
    marca,
    descripcion,
    caracteristicas,
    precio,
    stock,
    img,
    productWatch,
  })

  if (response) {
    alert("el producto se actualizo correctamente")
  } else {
    alert("el producto no se actualizo")
  }
  } catch (error) {
    
  }

};

document.getElementById("actualizar").addEventListener("click", handleActualizar);

/* boton borrar productos */
const handleDeleteProductos = async (id) => {
  try {
    let response = await axios.delete("http://localhost:3001/productos/"+id);
    if (response) {
      alert("producto borrado correctamente")
    }else{
      alert("no se pudo borrar el producto")
    }
  } catch (error) {
    console.error(error)
  }

}

/* tabla productos */
function TablaProductos() {

  const encabezadoTitulo = document.getElementById("h1");
    encabezadoTitulo.innerHTML = "";

  h1.innerHTML = `
          <h1 id="h1">Tabla productos</h1>
    `;


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
                <button type="button" class="btn btn-danger" onClick="handleDeleteProductos('${productos.id}')"><i class="bi bi-trash3-fill"></i></button>
                <button type="button" class="btn btn-success" id="handleedit" onClick="handleEdit('${productos.id}','${productos.nombre}','${productos.marca}','${productos.descripcion}','${productos.caracteristicas}','${productos.precio}','${productos.stock}','${productos.img}')"><i class="bi bi-pencil-fill"></i></button>
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


/* tabla ventas */
function TablaVentas () {

  
  const encabezadoTitulo = document.getElementById("h1");
    encabezadoTitulo.innerHTML = "";

  h1.innerHTML = `
          <h1 id="h1">Tabla ventas</h1>
    `;


  const encabezadoVentas = document.getElementById("thead");
  encabezadoVentas.innerHTML = "";

  thead.innerHTML = `
          <th scope="col">id</th>
          <th scope="col">cliente</th>
          <th scope="col">vendedor</th>
          <th scope="col">producto</th>
          <th scope="col">precio</th>
          <th scope="col">cantidad</th>
          <th scope="col">total</th>
  `;

  const cuerpoVentas = document.getElementById("tbody");
  cuerpoVentas.innerHTML = "";

  const getVentas = async () => {
  try {
    let response = await axios.get("http://localhost:3001/ventas")

    response.data.map(
      (ventas)=>
        (document.getElementById("tbody").innerHTML +=`
              <th scope="row">${ventas.id}</th>
              <td>${ventas.cliente}</td>
              <td>${ventas.vendedor}</td>
              <td>${ventas.producto}</td>
              <td>${ventas.precioProducto}</td>
              <td>${ventas.cantidadComprada}</td>
              <td>${ventas.totalPagado}</td>
        `)
    )
  } catch (error) {
    console.error("Error al obtener a las ventas:", error);
  }

}

getVentas();

/* poner boton producto y sacar boton vendedor y usuario */
document.getElementById("botonAgregar").style.display = "none";
document.getElementById("botonAgregar2").style.display = "none";
document.getElementById("botonAgregar3").style.display = "none";

/* agregar y volver (formulario3) */
const handleClick = () => {
  document.getElementById("botonAgregar3").style.display = "none";
  document.getElementById("form3").style.display = "none";
  document.getElementById("boton3").style.display = "none";
};

const handlebackClick = () => {
  document.getElementById("botonAgregar3").style.display = "none";
  document.getElementById("form3").style.display = "none";
  document.getElementById("boton3").style.display = "none";
};

document.getElementById("volver3").addEventListener("click", handlebackClick);

document.getElementById("botonAgregar3").addEventListener("click", handleClick);

/* sacar formulario 1 y sus botones */
document.getElementById("form").style.display = "none";
document.getElementById("boton").style.display = "none";

/* sacar formulario 2 y sus botones */
document.getElementById("form2").style.display = "none";
document.getElementById("boton2").style.display = "none";

}


/* para agregar un usuario con el boton confirmar */

const handleconfirmar = async () => {
  try {
    let usuario = document.getElementById("usuario").value;
    let contraseña = document.getElementById("contraseña").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    let rol = document.getElementById("rol").value;
    let login = document.getElementById("login").value;
    let productFav = document.getElementById("productFav1").value;
    let productCar = document.getElementById("productCar1").value;

  let response = await axios.post("http://localhost:3001/usuarios/"+ID2,{
    usuario,
    contraseña,
    email,
    telefono,
    rol,
    login,
    productFav:[],
    productCar:[],
  })

    if (response) {
      alert("usuario agregado correctamente");
    }
  } catch (error) {
    console.log("usuario agregado incorrectamente",error);
  }
};

document.getElementById("confirmar").addEventListener("click",()=> handleconfirmar());

/* para agregar un vendedor con el boton confirmar2 */

const handleconfirmar2 = async () => {
  try {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let email = document.getElementById("email2").value;
    let telefono = document.getElementById("telefono2").value;

    let response = await axios.post("http://localhost:3001/vendedores"+ID3, {
      nombre,
      apellido,
      email,
      telefono,
    });

    if (response) {
      alert("vendedor agregado correctamente");
    } 
  } catch (error) {
    console.log("vendedor agregado incorrectamente",error);
  }
};

document.getElementById("confirmar2").addEventListener("click", handleconfirmar2);

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

    let response = await axios.post("http://localhost:3001/productos/"+ID,{
      nombre,
      marca,
      descripcion,
      caracteristicas,
      precio,
      stock,
      img,
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

document.getElementById("confirmar3").addEventListener("click", handleconfirmar3);



  
