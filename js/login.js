const url = 'http://localhost:3001/usuarios';



async function acceder(event) {
    try {
        event.preventDefault();
    
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
       
        await fetch(url)
        .then(res => res.json())
        .then(data => {
       
           let contador = 0;
           console.log('Datos recibidos de la API:', data);
         
            data.forEach(usuario => {
                console.log(usuario);
             if(email === usuario.email&& password === usuario.contraseña){
                contador = 0;
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
            /*console.log(data)*/
        
        })
    } catch (error) {
        console.error('Hubo un error con la petición a la API:', error);
    }

   
 

}


let btnContinuar = document.getElementById("continuar-btn");
btnContinuar.addEventListener("click", acceder);
   
        




