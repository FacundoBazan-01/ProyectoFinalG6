<<<<<<< HEAD
const enviarDatos = async () => {
=======
const enviarDatos = async (event) => {
>>>>>>> ca1b76878c38058c400c8338c2d90957b127d6b3
  let bandera = true;
  try {
    let email = document.getElementById("email").value;
    let user = document.getElementById("usuario").value;
    let telef = document.getElementById("telefono").value;
    let pass = document.getElementById("contraseña").value;
    let passRep = document.getElementById("contraseñaRep").value;

    if ( email != "" && user != "" && telef != "" && pass != "" && passRep != "") 
    {
      let traerUser = await axios.get("http://localhost:3001/usuarios");
      console.log(traerUser.data);
      for (let i = 1; i < traerUser.data.length; i++) {
        if (pass != passRep) {
          bandera = false;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Las contraseñas no coinciden!",
          });
          console.log(bandera)
          break;
        }

        if (email != traerUser.data[i].email && user != traerUser.data[i].usuario) {
        } else {
          bandera = false;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El usuario o email ya existen!",
          });
          console.log(bandera)
          break;
        }
      }
      if (bandera === true) {
            let usuarioNuevo = {
            usuario: user,
            contraseña: pass,
            email: email,
            telefono: telef,
<<<<<<< HEAD
            role: "user",
            login:false,
            };

            let respone = await axios.post("http://localhost:3001/usuarios",usuarioNuevo);
            if (respone) {
                Swal.fire({
                    title: "Bienvenido!",
                    text: "Tu usuario fue creado correctamente!",
                    icon: "success",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "El usuario no se pudo crear intentalo de nuevo!",
            });
            }
=======
            rol: "user",
            login:false,
            };
            if (usuarioNuevo) {
              Swal.fire({
                title: "Usuario creado correctamente, deseas iniciar sesion?",
                showCancelButton: true,
                confirmButtonText: "Si",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  await axios.post("http://localhost:3001/usuarios",usuarioNuevo);
                  window.location.href="../html/login.html"
                } 
              });
              
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El usuario no se pudo crear intentalo de nuevo!",
              });
            }
            
>>>>>>> ca1b76878c38058c400c8338c2d90957b127d6b3
      }
      
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Rellene los campos correctamente!",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

<<<<<<< HEAD
document.getElementById("btn").addEventListener("click", () => enviarDatos());
=======

document.getElementById("btn").addEventListener("click", () => enviarDatos());



>>>>>>> ca1b76878c38058c400c8338c2d90957b127d6b3
