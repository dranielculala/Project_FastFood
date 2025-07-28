
function login() {
    const cUsername = document.getElementById('username').value;
    const cPassword = document.getElementById('password').value;
    const cUser_type = document.getElementById('user_type').value;

    const user = {
        username: cUsername,
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

    fetch("http://localhost:3000/user/login", options)
        .then(response => response.json())
        .then(result => checkLogin(result));
}

function checkLogin(result) {
    var alert = document.getElementById('alert');
    if (result.error) {
        alert.innerHTML = result.error;
        alert.classList.remove('d-none');
    } else {
        localStorage.setItem('user_id', result._id);
        alert.classList.add('d-none');
        var form = document.getElementById('form');
        form.classList.add('d-none'); 
    }
}