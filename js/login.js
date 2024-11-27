<<<<<<< HEAD
=======

>>>>>>> ca1b76878c38058c400c8338c2d90957b127d6b3
const url = 'http://localhost:3001/usuarios';



async function acceder(event) {
    try {
        event.preventDefault();
    
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
<<<<<<< HEAD
       
        await fetch(url)
        .then(res => res.json())
        .then(data => {
=======

       let response = await axios.get(url)
       let data = response.data;
>>>>>>> ca1b76878c38058c400c8338c2d90957b127d6b3
       
           let contador = 0;
           console.log('Datos recibidos de la API:', data);
         
            data.forEach(usuario => {
                console.log(usuario);
             if(email === usuario.email&& password === usuario.contraseña){
                contador = 0;
<<<<<<< HEAD
=======
              axios.patch(`http://localhost:3001/usuarios/${usuario.id}`,{login : true})
>>>>>>> ca1b76878c38058c400c8338c2d90957b127d6b3
               window.location.href ="../index.html"
                console.log(contador);
                
             } else {
                contador+= 1;
                console.log(contador);
             }
       
            });
           if(contador === 0){
               
           }else{
            alert("email o contraseña incorrecto")
           }
<<<<<<< HEAD
            /*console.log(data)*/
        
        })
=======
           
       
>>>>>>> ca1b76878c38058c400c8338c2d90957b127d6b3
    } catch (error) {
        console.error('Hubo un error con la petición a la API:', error);
    }

   
 

}


let btnContinuar = document.getElementById("continuar-btn");
btnContinuar.addEventListener("click", acceder);
   
        




