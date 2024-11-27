const url = 'http://localhost:3001/usuarios';



async function acceder(event) {
    try {
        event.preventDefault();
    
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

       let response = await axios.get(url)
       console.log(response.data);
       
           let contador = 0;
           
           for (let i = 0; i < response.data.length ; i++) {
            console.log(response.data[i].email);
            if (email === response.data[i].email&& password === response.data[i].contraseña && "user"===response.data[i].rol) {
                contador = 0;
                axios.patch(`http://localhost:3001/usuarios/${response.data[i].id}`,{login : true})
                window.location.href ="../index.html"
                console.log(contador);
                break
            } else {
                if (email === response.data[i].email&& password === response.data[i].contraseña && "admin"===response.data[i].rol) {
                    console.log("encontrado")
                    contador=0
                    window.location.href="../html/administrado2.html"
                    break
                } else {
                    contador+= 1;
                    console.log(contador);
                }
            }
            
            };
           if(contador === 0){
               
           }else{
            alert("email o contraseña incorrecto")
           }
       
    } catch (error) {
        console.error('Hubo un error con la petición a la API:', error);
    }
}


let btnContinuar = document.getElementById("continuar-btn");
btnContinuar.addEventListener("click", acceder);
   
        




