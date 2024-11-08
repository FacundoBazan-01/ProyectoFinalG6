const enviarDatos = async ()=>{
    let bandera = true;
    try {
        
        let email = document.getElementById("email").value;
        let user = document.getElementById("usuario").value;
        let telef = document.getElementById("telefono").value;
        let pass = document.getElementById("contraseña").value;
        
        if (email != "" && user != "" && telef != "" && pass != ""){

        let traerUser = await axios.get("http://localhost:3001/usuarios");
        
        for (let i = 1; i < traerUser.data.length; i++) {
            if (email !== traerUser.data[1].email && user !== traerUser.data[1].usuario) {

            }else{
                let bandera= false;
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "El usuario ya existe!",
                  });
                  break;
            }
            
        }
        if (bandera === true) {
            let usuarioNuevo ={
                email: email, 
                usuario:user,
                telefono:telef,
                contraseña: pass,
                role : "user"
            }
    
            let respone = await axios.post("http://localhost:3001/usuarios", usuarioNuevo);
            if (respone) {
                Swal.fire({
                    title: "Bienvenido!",
                    text: "Tu usuario fue creado correctamente!",
                    icon: "success"
                  })
           
        } else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El usuario no se pudo crear intentalo de nuevo!",
              });
        }
        

        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El usuario ya existe!",
              });
        }
 
    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Rellene los campos correctamente!",
          });
    }
} catch (error) {
        console.error(error)
    }

}


document.getElementById("btn").addEventListener("click",()=> enviarDatos() );