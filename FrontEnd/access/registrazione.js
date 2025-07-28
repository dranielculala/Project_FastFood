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
        .then(result => {
            console.log(result);
            if (!result.error) {
                alert(result.message);
                localStorage.setItem('id_user', result.id);
                localStorage.setItem('username', result.username);
                window.location.href = "../profile/profile.html";
            } else {
                alert(result.error);
            }
        });
 }
function isValid() {
    var valid = true;
    const regexEmail = /^[A-z0-9\.\+_-]+@[A-z0-9\._-]+\.[A-Za-z]{2,6}$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!._-])[A-Za-z\d!._-]{8,16}$/;
    const regexUsername = /^.{3,}$/;

    const cUsername = document.getElementById('username');
    const cEmail = document.getElementById('email');
    const cPassword = document.getElementById('password');
    const cPasswordConfirm = document.getElementById('password_rep');
    const cUser_type = document.getElementById('user_type');
    var error = document.getElementById('alert');

    error.innerHTML = "Errori:"; 

    // Username check
    if (!regexUsername.test(cUsername.value)) {
        valid = false;
        cUsername.classList.add('border', 'border-danger');
        error.innerHTML += "<br> Username non valido (deve essere lungo almeno 3 caratteri). ";
    } else {
        cUsername.classList.remove('border', 'border-danger');
    }

    // Email check
    if (!regexEmail.test(cEmail.value)) {
        valid = false;
        cEmail.classList.add('border', 'border-danger');
        error.innerHTML += "<br> Email non valida.";
    } else {
        cEmail.classList.remove('border', 'border-danger');
    }

    // Password check
    if (!regexPassword.test(cPassword.value)) {
        valid = false;
        cPassword.classList.add('border', 'border-danger');
        error.innerHTML += "<br> Password non valida (deve contenere almeno 8 caratteri e al massimo 16 caratteri, un maiuscolo, un minuscolo, un numero e un carattere speciale).";
    } else {
        cPassword.classList.remove('border', 'border-danger');
    }

    if(cPassword.value !== cPasswordConfirm.value) {
        valid = false;
        cPasswordConfirm.classList.add('border', 'border-danger');
        error.innerHTML += "<br> Le password non corrispondono.";
    } else {
        cPasswordConfirm.classList.remove('border', 'border-danger');
    }

    // User type check
    if( cUser_type.value === "undefined") {
        valid = false;
        cUser_type.classList.add('border', 'border-danger');
        error.innerHTML += "<br> Scegliere il tipo di utente.";
    } else {
        cUser_type.classList.remove('border', 'border-danger');
    }

    return valid;
}