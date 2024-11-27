const url = "http://localhost:3001/productos";



//id="empezarCompra"


const imgFav = document.getElementById("imgFav")
const datosProductos = document.getElementById("cartaProductos")

let usuarios = ""
let productos = ""
let vendedores = ""

const traerDatos = async () => {
  try {
    usuarios = await axios.get("http://localhost:3001/usuarios");
    productos = await axios.get("http://localhost:3001/productos");
    // console.log(productos.data)
    vendedores = await axios.get("http://localhost:3001/vendedores");
  } catch (error) {
    console.error(error);
  }
};
  
traerDatos();

const mostrarDatos = async () => {

  let contador = 1;
  let productoCarrito = "" ;
  let numeroAleatorio = Math.floor(Math.random() * 5) + 1;

  try {
    
    for (let i = 0; i < productos.data.length; i++) {
      if (productos.data[i].productCar === false) {
        contador++;
      } else {
        console.log(`producto encontrado ${productos.data[i].id}`);
        contador = 0;
        productoCarrito = await productos.data[i];
        Id_product = await productos.data[i].id;

        imgFav.innerHTML+=`
        <img src=${productos.data[i].img[0]} alt="Producto" width="180px" height="200px"/>
        
        `

        //productoCarrito.nombre
        datosProductos.innerHTML+= `
          <hr>
          <div>
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        `
        //const datosProductos = document.getElementById("datosProductos")
        
        datosProductos.innerHTML+= `
        

        `

      }

    }


  
  } catch (error) {
    console.error(error)
    
  }


}

setTimeout(() => {
 mostrarDatos();
}, 1000);






const  validarUserCompra = async () => {
  try {

    for (let i = 1; i < usuarios.data.length; i++) {
      if (usuarios.data[i].login === false) {
        alert("Debes iniciar sesion antes de realizar esta accion");
        window.location.href = "./login.html";
      }
    }

  } catch (error) {
    console.error(error);
  }
};


/* Mostar input de tarjeta de credito */
const mostrarInputCre = () =>{
  inputTarjetaCre.innerHTML = `
   <input type="number"  style="display: block;" id="inputTarjetaCreV"
      class="form-control" aria-describedby="passwordHelpInline"
      placeholder="Ingresa tu numero de tarjeta">
  `;
  inputTarjetaDeb.innerHTML=`
   <input type="number"  style="display: none;" id="inputTarjetaDebV"
      class="form-control" aria-describedby="passwordHelpInline"
      placeholder="Ingresa tu numero de tarjeta">
  `;

}
/* Ocultar los inputs */
const ocultarInputs = () =>{
  inputTarjetaCre.innerHTML = `
  <input type="number"  style="display: none;" id="inputTarjetaCreV"
     class="form-control" aria-describedby="passwordHelpInline"
     placeholder="Ingresa tu numero de tarjeta">
 `;
 inputTarjetaDeb.innerHTML=`
  <input type="number"  style="display: none;" id="inputTarjetaDebV"
     class="form-control" aria-describedby="passwordHelpInline"
     placeholder="Ingresa tu numero de tarjeta">
 `
}

/* Mostar input de tarjeta de debito */
const mostrarInputDeb = ()=>{
  inputTarjetaCre.innerHTML = `
  <input type="number"  style="display: none;" id="inputTarjetaCreV"
     class="form-control" aria-describedby="passwordHelpInline"
     placeholder="Ingresa tu numero de tarjeta">
 `;
 inputTarjetaDeb.innerHTML=`
  <input type="number"  style="display: block;" id="inputTarjetaDebV"
     class="form-control" aria-describedby="passwordHelpInline"
     placeholder="Ingresa tu numero de tarjeta">
 `;
}



document.getElementById("empezarCompra").addEventListener("click", () => validarUserCompra());
document.getElementById("tarjetaDeb").addEventListener("click", ()=> mostrarInputDeb())
document.getElementById("efectivo").addEventListener("click", ()=> ocultarInputs())
document.getElementById("tarjetaCre").addEventListener("click", ()=> mostrarInputCre())
document.getElementById("addCompra").addEventListener("click", () => realizarCompra() )





