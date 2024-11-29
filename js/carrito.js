const url = "http://localhost:3001/productos";



const imgFav = document.getElementById("imgFav")
const datosProductos = document.getElementById("cardCarritos")


let usuarios = ""
let productos = ""
let vendedores = ""
let Id_vendedor = ""
let Id_product = ""
let Id_cliente = ""
let nombre_vendedor = ""
let nombreProducto = ""
let precioporProducto=""
let stockBD=""


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

  let contador = 0;
    for (let i = 1; i < usuarios.data.length; i++) {
      if (usuarios.data[i].login === true) {
        Id_cliente = await usuarios.data[i].id;
        nombre_usuario = await usuarios.data[i].nombre;

        contador = 0;
        break;
      } else {
        contador = contador + 1;
      }
    }

    /* Encuentro el usuario que esta activo */
    const usuaruoActivo = usuarios.data.find(usuario =>  usuario.id === Id_cliente)
    console.log(usuaruoActivo.productCar)

    for (let i = 0; i < productos.data.length; i++) {

      for (let j = 0; j < usuaruoActivo.productCar.length; j++) {

        if (productos.data[i].id===usuaruoActivo.productCar[j]) {

          console.log(usuaruoActivo.productCar[j])
          
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
