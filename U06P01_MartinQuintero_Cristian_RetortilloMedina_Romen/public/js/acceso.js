const expresionCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;
const aceptPassw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

function registered() {
  document.getElementById("registrado").style.display = "inline";
  document.getElementById("NoLog").style.display = "inline";
  document.getElementById("registro").style.display = "none";
  document.getElementById("Info").innerHTML = " "
}

function crear() {
  document.getElementById("registrado").style.display = "none";
  document.getElementById("NoLog").style.display = "none";
  document.getElementById("registro").style.display = "inline";
  document.getElementById("Info").innerHTML = " "
}

function acceso() {
  document.getElementById("registrado").style.display = "none";
  document.getElementById("registro").style.display = "none";
  document.getElementById("NoLog").style.display = "none";
  document.getElementById("Logged").style.display = "inline";
  document.getElementById("usuario").style.display = "inline";
}

function registrar() {
  let email = document.getElementById("Nombre").value;
  let password = document.getElementById("Pass").value;
  let messError = "";

  if (expresionCorreo.test(email)) {
    if (aceptPassw.test(password)) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        })
        .then(result => {

          if (result != null) {
            document.getElementById("Nombre").value = "";
            document.getElementById("Pass").value = "";
            let user = result.user;
            document.getElementById("saludo").innerHTML = `Bienvenido  ${user.email}`;
            acceso()
          }

        });
    }

    else 
      messError = "Contraseña introducida no valida compruebe que la longitud es de entre 8 y 15 con al menos una mayuscula una minuscula un digito y 1 caracter especial (No se admiten espacios en blanco)"
    
  }

  else 
    messError = "Correo electronico no valido"
  
  document.getElementById("Info").innerHTML = messError
}

function acceder() {

  let email = document.getElementById("Usuario").value;
  let password = document.getElementById("Cont").value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorMessage = error.message;
    alert(errorMessage);
    console.log(error);
  })
    .then(result => {
      let user = result.user;
      document.getElementById("saludo").innerHTML = `Bienvenido ${user.email}`;
      acceso()
    }
    );
}


function facebookLogin() {
  var provider = new firebase.auth.FacebookAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    let user = result.user;
    document.getElementById("saludo").innerHTML = `Bienvenido ${user.displayName}`;
    acceso()
  }).catch(function(error) {
    var errorMessage = error.message;
    alert(errorMessage);
    console.log(error);
  });
}

function googleLogin() {
  let provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)

    .then(result => {
      let user = result.user;
      document.getElementById("saludo").innerHTML = `Bienvenido ${user.displayName}`;
      acceso()
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorMessage = error.message;
      alert(errorMessage);
      console.log(error);
    })
}

function gitHubSignin() {
  let provider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      let user = result.user;
      document.getElementById("saludo").innerHTML = `Bienvenido ${user.email}`;
      acceso()
    }

    ).catch(function (error) {
      var errorMessage = error.message;
      alert(errorMessage);
      console.log(error);
    });
}

function logout() {

  firebase.auth().signOut().then(function () {
    document.getElementById("saludo").innerHTML = `Ha cerrado su sesion`;
    document.getElementById("registrado").style.display = "none";
    document.getElementById("registro").style.display = "inline";
    document.getElementById("NoLog").style.display = "none";
    document.getElementById("Logged").style.display = "none";
    document.getElementById("usuario").style.display = "none";
  })
    .catch(console.log);
}