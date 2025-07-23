 function registra() {
// check if valid
    if (!isValid()) {
        document.getElementById('alert').classList.remove('d-none');
        return;
    } else {
        document.getElementById('alert').classList.add('d-none');
    }

    const cUsername = document.getElementById('username').value;
    const cEmail = document.getElementById('email').value;
    const cPassword = document.getElementById('password').value;
    const cUser_type = document.getElementById('user_type').value;

    const user = {
        username: cUsername,
        email: cEmail,
        password: cPassword,
        user_type: cUser_type
    };

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    fetch("http://localhost:3000/user/register", options)
        .then(response => response.json())
        .then(result => checkRegistration(result));
 }

function checkRegistration(result) {
    console.log(result)
    console.log('whatz');
}

function isValid() {
    var valid = true;
    const regexEmail = /^[A-z0-9\.\+_-]+@[A-z0-9\._-]+\.[A-Za-z]{2,6}$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!._-])[A-Za-z\d!._-]{8,16}$/;
    const regexUsername = /^.{3,}$/;

    const cUsername = document.getElementById('username').value;
    const cEmail = document.getElementById('email').value;
    const cPassword = document.getElementById('password').value;
    const cPasswordConfirm = document.getElementById('password_rep').value;
    const cUser_type = document.getElementById('user_type').value;
    var error = document.getElementById('alert');

    error.innerHTML = "Errori:"; 

    // Username check
    if (!regexUsername.test(cUsername)) {
        valid = false;
        error.innerHTML += "<br> Username non valido (deve essere lungo almeno 3 caratteri). ";
    }

    // Email check
    if (!regexEmail.test(cEmail)) {
        valid = false;
        error.innerHTML += "<br> Email non valida.";
    }

    // Password check
    if (!regexPassword.test(cPassword)) {
        valid = false;
        error.innerHTML += "<br> Password non valida (deve contenere almeno 8 caratteri e al massimo 16 caratteri, un maiuscolo, un minuscolo, un numero e un carattere speciale).";
    }

    if(cPassword !== cPasswordConfirm) {
        valid = false;
        error.innerHTML += "<br> Le password non corrispondono.";
    }

    if( cUser_type === "undefined") {
        valid = false;
        error.innerHTML += "<br> Scegliere il tipo di utente.";
    }

    return valid;
}